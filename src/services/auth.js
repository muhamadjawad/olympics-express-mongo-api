require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { response } = require("express");
const { userCollection } = require("../models/users");
const { CustomError } = require("../utils/customError");

const signUp = async (req) => {

    const { firstName, lastName, username, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);
    if (!firstName || !lastName || !username || !email || !password) {
        CustomError(`enter all entries`, 400)
    }

    const userData = {
        firstName,
        lastName,
        username,
        email,
        hash_password,
    };

    let result = ""
    // result = await userCollection.findOne({ email })
    if (await userCollection.findOne({ email })) {
        CustomError(`email already exists`, 403)
    }
    // result = await userCollection.findOne({ username })
    if (await userCollection.findOne({ username })) {
        CustomError(`username already exist`, 403)
    }


    if (!result) {
        return userCollection.create(userData)
            .then((user, err) => {
                if (err) {
                    CustomError(`something went wrong`, 500)
                }
                else {
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    return { _id, firstName, lastName, email, role, fullName }
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
            if (await user.authenticate(password)) {
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