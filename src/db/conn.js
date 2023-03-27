require("dotenv").config()
const mongooose = require('mongoose')

// const uri = "mongodb://127.0.0.1:27017/olympics"


const connectDB = () => {
    mongooose.connect(process.env.MONGO_DB_URL, {
    }).then(() =>
        console.log("connection  succesful")).
        catch((error) => {
            console.log("no connection because ", error)
        })
}

module.exports = { connectDB }