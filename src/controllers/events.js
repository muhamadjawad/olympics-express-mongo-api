const { eventsCollection } = require("../models/events")
const { events } = require('../services')

const findAllEvents = async (req, res) => {

    try {
        const { metaData, allEvents } = await events.getAllEvents(req)
        res.status(200).json({
            "_metadata": metaData,
            "records": allEvents,
        })

    } catch (error) {
        console.log("error", error)
    }

}

const createEvent = async (req, res) => {

    try {
        const insertedEvent = await events.postEvent(req)
        res.status(201).send(insertedEvent)

    }
    catch (error) {
        res.status(
            400
        ).send(error)

    }
}


module.exports = {
    findAllEvents, createEvent
}