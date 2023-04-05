const { eventsCollection } = require("../models/events")
const { events } = require('../services')
const { CustomError } = require("../utils/customError")

const findAllEvents = async (req, res, next) => {

    try {
        const { metaData, allEvents } = await events.getAllEvents(req)
        res.status(200).json({
            "_metadata": metaData,
            "records": allEvents,
        })

    } catch (error) {
        next(error);
    }

}

const createEvent = async (req, res, next) => {

    try {
        const insertedEvent = await events.postEvent(req)
        res.status(201).send(insertedEvent)
    }

    catch (error) {
        next(error)
    }
}


module.exports = {
    findAllEvents, createEvent
}