const express = require('express')
const router = express.Router()
const {auth} = require('../controllers')

router.route("/signup").post(auth.createUser)

module.exports = router