const express = require('express')
const router = express.Router()
const EventModel = require('../../models/event-model')

async function deleteEventById(id) {
    await EventModel.deleteOne({ _id: id });
    return id;
}

router.post('/api/event', async (req, res) => {
    const model = new EventModel(req.body)

    const db = await model.save()

    res.json({
        id: db._id
    })
})

router.delete('/api/event/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new Error('id is not defined');
    }

    await deleteEventById(id);
    res.json({ id });
});

module.exports = (app) => {
    app.use(router)
}