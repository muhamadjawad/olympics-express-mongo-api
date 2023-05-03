const { connectDB } = require("./src/db/conn")
const { eventsCollection } = require("./src/models/events")
const EventJSON = require("./src/json/events.json")

//by this you can save josn to collections
const start = async () => {
    try {
        await connectDB()
        await eventsCollection.insertMany(EventJSON)
        console.log("Successfully transfered data")

    } catch (error) {
        console.log(error);
    }
}

start()