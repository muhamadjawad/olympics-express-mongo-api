const express = require('express')
const router = express.Router()
// const { getAllEvents,createEvent } = require('../controllers/events')
const { events } = require('../controllers')
const { verifyJWT } = require('../validators/auth')

router.route("/events").get(verifyJWT, events.findAllEvents)

router.route("/events").post(events.createEvent)

module.exports = router