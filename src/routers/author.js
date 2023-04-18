const express = require('express')
const router = express.Router()
const { author } = require('../controllers')

router.route('/author')
    .get(author.findAllAuthors)
    .post(author.createAuthor)

module.exports = router