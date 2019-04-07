const express = require('express')
const supertest = require('supertest')

const router = require('../web/routing/calendar.router')

let app = null

beforeEach(() => {
    app = express()
    router(app)
})

it('it should response on /api/calendar', async () => {
    const res = await supertest(app)
        .get('/api/calendar')
    expect(res.status).toBe(200)
})