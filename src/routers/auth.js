const express = require('express')
const router = express.Router()
const { auth } = require('../controllers');
const { isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../validators/auth');



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

module.exports = router