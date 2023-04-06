require("dotenv").config()

const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/customError");

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

const validateCreatePasswordRequest = [
    check('password').notEmpty().withMessage(`password field is required`),
    check('email').notEmpty().withMessage(`confirm password field is required`)
]

const verifyJWT = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization
        let token = ""
        // 
        if (tokenString) {
            if (tokenString.startsWith("Bearer ")) {
                token = tokenString.substring(7, tokenString.length);
                try {
                    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                        if (err) {
                            CustomError(`Invalid Bearer token`, 498)
                        }
                    })
                } catch (error) {
                    next(error)
                }
            }
            else {
                CustomError(`Invalid Bearer token`, 498)
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
    validateCreatePasswordRequest,
    verifyJWT
}