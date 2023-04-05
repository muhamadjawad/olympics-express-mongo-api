require("dotenv").config()
const express = require('express');
const { connectDB } = require("../src/db/conn");
const { myLogger } = require("./middlewares/logger");

const port = process.env.PORT || 3000;
const routers = require('./routers');
const { verifyJWT } = require("./validators/auth");

const app = express()

app.use(express.json())

// middleware
// app.use(myLogger)


app.use("/api/auth", routers.auth)
app.use("/api", verifyJWT, [routers.men, routers.events])
// app.use("/api", verifyJWT, routers.events)

// app.use((err, req, res, next) => {

//     console.log("error", err)
//     // res.status(400).send(err.message)
// })

connectDB()
app.listen(port, () => {
    console.log("listening on port", port)
})