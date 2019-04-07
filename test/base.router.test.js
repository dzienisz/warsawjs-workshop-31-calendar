const express = require('express')
const supertest = require('supertest')

const router = require('../web/routing/base.router')

it('it should response on /', async () => {
    let app = express()
    router(app)

    const res = await supertest(app)
        .get('/')
    expect(res.body.status).toEqual('OK')
})