const express = require('express')
const supertest = require('supertest')

const router = require('../web/routing/base.router')

let app = null

beforeEach(() => {
    app = express()
    router(app)
})

it('it should response on /', async () => {
    const res = await supertest(app)
        .get('/')
    expect(res.body.status).toEqual('OK')
})