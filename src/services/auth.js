require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { response } = require("express");
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
            .then((user, err) => {
                if (err) {
                    console.log("Error", err)
                    return {
                        error: true,
                    }
                }
                else {
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    return { _id, firstName, lastName, email, role, fullName }
                    // res
                    //     .status(StatusCodes.CREATED)
                    // .json({ message: "User created Successfully" });
                }

            });
    }

}

const signIn = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userCollection.findOne({ email: email });

        if (user) {
            let resp = ""
            if (user.authenticate(password)) {
                try {
                    const token = jwt.sign(
                        { _id: user._id, role: user.role },
                        process.env.JWT_SECRET, { expiresIn: "30d" });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    resp = {
                        token,
                        user: { _id, firstName, lastName, email, role, fullName },
                    }
                } catch (error) {
                    console.log("errir", error)
                }


            } else {
                console.log("Error aya")
                res.status(401).json({
                    error: true,
                    message: "Something went wrong!",
                });
            }
            res.status(200).json(resp)

        } else {
            res.status(400).json({
                error: true,
                message: "User does not exist..!",
            });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = { signUp, signIn }