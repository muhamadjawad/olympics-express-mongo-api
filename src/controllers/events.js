const { eventsCollection } = require("../models/events")

const getAllEvents = async (req, res) => {

    try {
        const DEFAULT_LIMIT = 10;
        const DEFAULT_PAGE = 1

        let { country, name, winner, sort, select, page, limit } = req.query;
        let queryObject = {}
        let sortQuery = {}
        let totalEvents = 0
        let totalPages = 0

        if (name) {
            queryObject.name = { $regex: name, $options: "i" }//regex for search
        }

        if (country) {
            queryObject.country = { $regex: country, $options: "i" }//regex for search
        }

        if (winner) {
            queryObject.winner = { $regex: winner, $options: "i" }
        }

        page = Number(page) || DEFAULT_PAGE
        limit = Number(limit) || DEFAULT_LIMIT

        let skip = (page - 1) * limit

        totalEvents = await eventsCollection.find().estimatedDocumentCount()
        totalPages = Math.ceil(totalEvents / limit)

        let apiData = eventsCollection.find(queryObject)
            .select(["name", "winner", "country", "date"])
            .skip(skip)
            .limit(limit)

        if (sort) {
            sortQuery = sort.replace(",", " ")

            apiData = apiData.sort(sortQuery)
        }

        const allEvents = await apiData

        let metaData = {
            "limit_per_page": limit,
            "page": page,
            "total_pages": totalPages,
            "total_records": totalEvents
        }

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