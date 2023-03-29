require("dotenv").config()
const express = require('express');
const { connectDB } = require("../src/db/conn")

const port = process.env.PORT || 3000;
const routers = require('./routers')

const app = express()

app.use(express.json())

app.use(routers.men)
app.use("/api", routers.events)
app.use("/auth",routers.auth)

connectDB()
app.listen(port, () => {
    console.log("listening on port", port)
})