require("dotenv").config()

const { check } = require("express-validator");
const jwt = require("jsonwebtoken");

const validateSignUpRequest = [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("email").isEmail().withMessage("Valid Email required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 character long"),
];

const validateSignInRequest = [
    check("username").notEmpty().withMessage("username is required"),
    check("email").isEmail().withMessage("Valid Email required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 character long"),
];

const verifyJWT = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization
        let token = ""
        // 
        if (tokenString) {
            if (tokenString.startsWith("Bearer ")) {
                token = tokenString.substring(7, tokenString.length);
                jwt.verify(token, process.env.JWT_SECRET)
            }
        }
        next()
    } catch (error) {
        next(error)
    }




}

module.exports = {
    validateSignUpRequest,
    validateSignInRequest,
    verifyJWT
}