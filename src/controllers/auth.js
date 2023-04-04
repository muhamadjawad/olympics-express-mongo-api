
const { userCollection } = require("../models/users");
const { auth } = require('../services')

const createUser = async (req, res) => {

    try {
        const response = await auth.signUp(req)

        res.status(200).json(response)

    } catch (error) {
        console.log("err", error)

    }
}

const signInUser = async (req, res) => {

    try {
        const response = await auth.signIn(req, res)
        // res.status(200).json(response)

    } catch (error) {
        console.log("err", error)

    }
}

module.exports = {
    createUser,
    signInUser
}