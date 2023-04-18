const express = require('express')
const router = express.Router()
const { post } = require('../controllers')

router.route('/post')
    .get(post.findAllPosts)
    .post(post.createPost)

module.exports = router