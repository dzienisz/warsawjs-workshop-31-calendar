const express = require('express')
const router = express.Router()

router.get('/api/calendar', (req, res) => {
    res.json({ status: 'OK' })
})

module.exports = (app) => {
    app.use(router)
}