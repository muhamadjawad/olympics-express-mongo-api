const mongoose = require("mongoose");
const  nanoid  = require('nanoid');

const eventsSchema = new mongoose.Schema({

    uniqueId: {
        type: String,
        // required: true,
        default: () => nanoid(7),
        index: { unique: true },
    },
    name: {
        type: String,
        required: [true, "plese title required"],
        unique: true
    },
    edition: {
        type: Number,
        min: 1,
        max: 8
    },
    date: {
        type: Date,
        default: Date.now(),
    }
    ,
    winner: {
        type: String,
        required: true,
        unique: false,
    },
    country: {
        type: String,
        required: false,
        unique: false,
        enum: {
            values: ['pak', 'india', 'asia'],
            message: "galta"
        }
    }
},
    {//to save the created and updation time so no date_created feild is  required to create
        timestamps: { createdAt: 'created_at', updatedAt: "updated_at" }

    }
)

const eventsCollection = new mongoose.model("events", eventsSchema)
module.exports = { eventsCollection }