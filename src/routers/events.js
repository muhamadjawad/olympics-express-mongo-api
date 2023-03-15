const express = require('express')
const router = express.Router()
const { getAllEvents,createEvent } = require('../controllers/events')


router.route("/events").get(getAllEvents)

router.route("/events").post(createEvent)

module.exports = router