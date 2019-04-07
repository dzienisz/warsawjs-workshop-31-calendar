const express = require('express')
const supertest = require('supertest')
const Ajv = require('ajv');
const bodyParser = require('body-parser')
const router = require('../web/routing/event.router')
const EventModel = require('../models/event-model')
const { connect } = require('../db')

let app = null

const ajv = new Ajv();

beforeAll(async () => {
    await connect()
})

beforeEach(() => {
    app = express()
    app.use(bodyParser.json())
    router(app)
})

afterEach(async () => {
    await EventModel.deleteMany({ title: 'test-event-title' });
});

const fake = () => ({
    title: 'test-event-title',
    description: 'test-event-description',
    time: new Date().toISOString(),
    notification: false
});

it('it should response on /api/event', async () => {
    const res = await supertest(app)
        .post('/api/event')

    expect(res.status).toBe(200)
})

it('is my JSON valid', async () => {
    const schema = require('../docs/schemas/event.scheme.json')
    const validate = ajv.compile(schema)

    const res = await supertest(app)
        .post('/api/event', {
            title: 'string',
            description: 'string',
            time: "YYYY-MM-DDThh:mm",
            notification: true
        })
        .expect(200)

    const valid = validate(res.body)
    expect(valid).toBeTruthy()
    expect(validate.errors).toBeNull()
})

it('should save event on POST /api/event', async () => {
    const res = await supertest(app)
        .post('/api/event')
        .send(fake())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)


    expect(res.body.id).not.toBeNull();
    expect(res.body.id).toEqual(jasmine.any(String));

    const list = await EventModel.find({ title: 'test-event-title' });
    expect(list.length).toEqual(1);
})

it('shoud delete event on DELETE /api/event', async () => {
    const model = new EventModel(fake())
    await model.save()

    const id = model._id

    const list = await EventModel.find({ title: 'test-event-title' });
    expect(list.length).toEqual(1);

    const res = await supertest(app)
        .delete(`/api/event/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    expect(res.body.id).not.toBeNull();
    expect(res.body.id).toEqual(jasmine.any(String));

    const list2 = await EventModel.find({ title: 'test-event-title' });
    expect(list2.length).toEqual(0);
})