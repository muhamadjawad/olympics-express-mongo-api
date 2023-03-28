const express = require('express')
const router = express.Router()
// const { getAllEvents,createEvent } = require('../controllers/events')
const { events } = require('../controllers')

router.route("/events").get(events.findAllEvents)

router.route("/events").post(events.createEvent)

module.exports = router