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
        CustomError(`Enter all entries`, 401)
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
        CustomError(`This email is already taken`, 401)
    }
    // result = await userCollection.findOne({ username })
    if (await userCollection.findOne({ username })) {
        CustomError(`This username is already taken`, 401)
    }


    if (!result) {
        return userCollection.create(userData)
            .then((user, err) => {
                if (err) {
                    CustomError(`Something went wrong`, 500)
                }
                else {
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    return { _id, firstName, lastName, email, role, fullName }
                }

            });
    }

}

const signIn = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // const user = await userCollection.findOne({ email: email });

        if (await userCollection.findOne({ email: email }) && await userCollection.findOne({ username: username })) {
            let resp = ""
            const user = await userCollection.findOne({ email: email, username, username })
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
                    CustomError()
                    // console.log("errir", error)
                }


            } else {
                CustomError("Invalid Credentials", 401)
            }
            res.status(200).json(resp)

        } else {
            CustomError("Invalid Credentials", 401)
        }
    } catch (error) {
        next(error)
        // res.status(400).json({ error });
    }
};

module.exports = { signUp, signIn }