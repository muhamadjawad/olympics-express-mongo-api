
const { userCollection } = require("../models/users");
const { auth } = require('../services')

const createUser = async (req, res, next) => {

    try {
        const response = await auth.signUp(req)

        res.status(200).json(response)

    } catch (error) {
        next(error)

    }
}

const signInUser = async (req, res, next) => {

    try {
        const response = await auth.signIn(req, res, next)
        // res.status(200).json(response)

    } catch (error) {
        console.log("err", error)

    }
}

module.exports = {
    createUser,
    signInUser
}