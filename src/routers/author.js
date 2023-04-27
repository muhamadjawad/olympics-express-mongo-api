const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { author } = require('../controllers')

router.route('/author')
    .get(author.findAllAuthors)
    .post(author.createAuthor)

router.route('/uploadimage')
    .post(upload.single('image'), author.uploadImage)

router.route('/downloadimage/:key')
    .get(author.downloadImage)

module.exports = router