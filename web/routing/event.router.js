const express = require('express')
const router = express.Router()
const EventModel = require('../../models/event-model')

router.post('/api/event', async (req, res) => {
    const model = new EventModel(req.body)

    const db = await model.save()

    res.json({
        status: 200,
        id: db._id
    })
})

module.exports = (app) => {
    app.use(router)
}