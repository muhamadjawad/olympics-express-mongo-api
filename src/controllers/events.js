const { eventsCollection } = require("../models/events")

const getAllEvents = async (req, res) => {

    const { country, name, winner } = req.query;
    const queryObject = {}

    if (name) {
        queryObject.name = { $regex: name, $options: "i" }//regex for search
    }

    if (country) {
        queryObject.country = { $regex: country, $options: "i" }//regex for search
    }

    if (winner) {
        queryObject.winner = { $regex: winner, $options: "i" }
    }

    const allEvents = await eventsCollection.find(queryObject)//name:"fif"

    res.status(200).json(allEvents)
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