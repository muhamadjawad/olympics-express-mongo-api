const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        unique: false
    },
    winner: {
        type: String,
        required: true,
        unique: false
    },
    country: {
        type: String,
        required: false,
        unique: false
    }
})

const eventsCollection = new mongoose.model("events", eventsSchema)
module.exports = { eventsCollection }