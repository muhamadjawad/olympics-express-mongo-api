const mongoose = require("mongoose");
require('./post');

const authorsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 5,
        required: true,
    },
    lastName: {
        type: String,
        min: 5,
        required: true,
    },
    email: {
        type: String,
        min: 6,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
    ],
}, {
    usePushEach: true,
})

const authorsCollection = new mongoose.model("authors", authorsSchema)
module.exports = { authorsCollection }