const express = require('express')
const router = express.Router()
const { auth } = require('../controllers');
const { isRequestValidated } = require('../validators');
const { validateSignUpRequest, validateSignInRequest, validateCreatePasswordRequest } = require('../validators/auth');

router.route("/signup").post(
    validateSignUpRequest,
    isRequestValidated,
    auth.createUser
)

router.route("/signin").post(
    validateSignInRequest,
    isRequestValidated,
    auth.signInUser
)

router.route("/createpassword").post(
    validateCreatePasswordRequest,
    isRequestValidated,
    auth.createUserPassword 
)


module.exports = router