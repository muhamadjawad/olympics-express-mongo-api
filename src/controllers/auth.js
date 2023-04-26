
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
        next(error)
    }
}

const createUserPassword = async (req, res, next) => {
    try {
        await auth.createPassword(req, res, next)
    } catch (error) {
        next(error)
    }
}

const forgotpassword = async (req, res, next) => {
    try {
        await auth.forgotPassword(req, res, next)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    signInUser,
    createUserPassword,
    forgotpassword
}