require("dotenv").config()
const express = require('express');
const { connectDB } = require("../src/db/conn")

const port = process.env.PORT || 3000;

const mens_router = require('./routers/men');
const event_routes = require('./routers/events')

const app = express()
app.use(express.json())


app.use(mens_router)
app.use("/api", event_routes)

connectDB()
app.listen(port, () => {
    console.log("listening on port", port)
})