const express = require('express')
const router = express.Router()
// const { getAllEvents,createEvent } = require('../controllers/events')
const { events } = require('../controllers')
const { isRequestValidated } = require('../validators')
const {  validateCreateEventsRequest } = require('../validators/event')

router.route("/events").get(events.findAllEvents)

router.route("/events").post(validateCreateEventsRequest, isRequestValidated, events.createEvent)

module.exports = router