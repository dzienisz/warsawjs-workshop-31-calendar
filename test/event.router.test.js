const express = require('express')
const supertest = require('supertest')
const Ajv = require('ajv');
var bodyParser = require('body-parser');

const router = require('../web/routing/event.router')

let app = null

const ajv = new Ajv();

beforeEach(() => {
    app = express()
    app.use(bodyParser.json())
    router(app)
})

it('it should response on /api/event', async () => {
    const res = await supertest(app)
        .get('/api/event')

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