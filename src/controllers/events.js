const { eventsCollection } = require("../models/events")

const getAllEvents = async (req, res) => {
    console.log("O Event");

    try {
        const { country, name, winner } = req.query;
        const queryObject = {}
        console.log("req.query", req.query)
        if (name) {
            queryObject.name = { $regex: name, $options: "i" }//regex for search
        }

        if (country) {
            queryObject.country = { $regex: country, $options: "i" }//regex for search
        }

        if (winner) {
            queryObject.winner = { $regex: winner, $options: "i" }
        }

        const allEvents = await eventsCollection.find(queryObject).sort("-date") // if sort is simple its ascending , if - then descending

        res.status(200).json(allEvents)

    } catch (error) {
        console.log("error", error)
    }

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