require("dotenv").config()
const express = require('express');
const { connectDB } = require("../src/db/conn");
const { ErrorHandler } = require("./middlewares/errorHandler");
const { myLogger } = require("./middlewares/logger");

const port = process.env.PORT || 3000;
const routers = require('./routers');
const { verifyJWT } = require("./validators/auth");

const app = express()

app.use(express.json())

// middleware
// app.use(myLogger)


app.use("/api", routers.auth)
app.use("/api", verifyJWT, [routers.men, routers.events, routers.author, routers.post])

app.use(ErrorHandler)

connectDB()
app.listen(port, () => {
    console.log("listening on port", port)
})