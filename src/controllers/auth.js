
const { userCollection } = require("../models/users");
const { auth } = require('../services')

const createUser = async (req, res) => {

    try {
        const response = await auth.signUp(req)

        res.status(200).json(response)

    } catch (error) {
        console.log("err", error)

    }

    // if (!firstName || !lastName || !email || !password) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({
    //         message: "Please Provide Required Information",
    //     });
    // }
}

module.exports = {
    createUser
}