const express = require('express')
const router = express.Router()

router.get('/api/calendar', (req, res) => {
    res.json({
        data: [
            {
                date: 'YYYY-MM-DD',
                events: [
                    {
                        id: 123,
                        title: 'string'
                    }
                ]
            }
        ]
    })
})

module.exports = (app) => {
    app.use(router)
}