const bcrypt = require("bcrypt");
const { response } = require("express");
const { userCollection } = require("../models/users");

const signUp = async (req) => {

    const { firstName, lastName, username, email, password } = req.body;
    var statusCode = 400
    var error = false;
    var errorMessage = '';
    var createdUser = {}
    var response = {}


    const hash_password = await bcrypt.hash(password, 10);
    if (!firstName || !lastName || !username || !email || !password) {
        return {
            error: true,
            message: `enter all entries`
        }
    }

    const userData = {
        firstName,
        lastName,
        username,
        email,
        hash_password,
    };

    let result = ""
    result = await userCollection.findOne({ email })
    if (result) {
        return {
            error: true,
            message: `email already exist`
        }
    }
    result = await userCollection.findOne({ username })
    if (result) {
        return {
            error: true,
            message: `username already exist`
        }
    }


    if (!result) {
        return userCollection.create(userData)
            .then((data, err) => {
                if (err) {
                    console.log("Error", err)
                    return {
                        error: true,
                    }
                }
                else {
                    return data
                    // res
                    //     .status(StatusCodes.CREATED)
                    // .json({ message: "User created Successfully" });
                }

            });
    }

}

module.exports = { signUp }