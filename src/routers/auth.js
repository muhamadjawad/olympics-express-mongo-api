const express = require('express')
const router = express.Router()
const { auth } = require('../controllers');
const { isRequestValidated, validateSignUpRequest } = require('../validators/auth');



router.route("/signup").post(
    validateSignUpRequest,
    isRequestValidated,
    auth.createUser)

module.exports = router