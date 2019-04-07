const express = require('express')
const router = express.Router()

const dayjs = require('dayjs')

/**
 * 
 * @param {string} month - Miesiąc. Przykład 2019-04
 * @returns {Array<string}
 */
function buildCalendar (month) {
    const date = new Date(month)

    const from = dayjs(date).startOf('month').startOf('week')

    const calendarWidth = 7
    const calendarHeigh = 6

    return Array
        .from({ length: calendarWidth * calendarHeigh })
        .map((_, index) => from.add(index + 1, 'day').toString())
}

function buildCalendarWithDates (month) {
    const days = buildCalendar(month)

    return days.map(day => ({
        date: day,
        events: [{
            id: 123,
            title: 'lol'
        }]
    }))
}

router.get('/api/calendar', (req, res) => {
    res.json({
        data: buildCalendarWithDates(12)
    })
})

module.exports = (app) => {
    app.use(router)
}