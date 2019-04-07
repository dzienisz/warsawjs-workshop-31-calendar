const express = require('express')
const supertest = require('supertest')
const Ajv = require('ajv');

const router = require('../web/routing/calendar.router')

let app = null

const ajv = new Ajv();

beforeEach(() => {
    app = express()
    router(app)
})

it('it should response on /api/calendar', async () => {
    const res = await supertest(app)
        .get('/api/calendar')

    expect(res.status).toBe(200)
})

it('is my JSON valid', async () => {
    const schema = require('../docs/schemas/calendar.scheme.json')
    const validate = ajv.compile(schema)

    const res = await supertest(app)
        .get('/api/calendar?month=???')
        .expect(200)

    const valid = validate(res.body)
    expect(valid).toBeTruthy()
    expect(validate.errors).toBeNull()
})