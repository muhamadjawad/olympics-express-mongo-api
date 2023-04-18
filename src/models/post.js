const mongoose = require("mongoose");
require ('./author')

const postsSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors',
    },
    date: {
        type: Date,
        // required: true,
    },
})

const postsCollection = new mongoose.model("posts", postsSchema)
module.exports = { postsCollection }