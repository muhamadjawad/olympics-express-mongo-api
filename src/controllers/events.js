const { eventsCollection } = require("../models/events")

const getAllEvents = async (req, res) => {

    res.status(200).json({
        msg: "aall proevents fetched"
    })
}

const createEvent = async (req, res) => {

    try {
        const body = req.body

        const newRecord = new eventsCollection(body)
        const insertEvent = await newRecord.save()
        res.status(201).send(insertEvent)

    }
    catch (error) {
        res.status(
            400
        ).send(error)

    }
}


module.exports = {
    getAllEvents, createEvent
}