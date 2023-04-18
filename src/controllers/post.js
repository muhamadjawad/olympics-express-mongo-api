const { post } = require('../services')


const findAllPosts = async (req, res, next) => {
    try {
        const { metaData, allPosts } = await post.getAllPosts(req)
        res.status(200).json({
            "_metadata": metaData,
            "records": allPosts,
        })

    } catch (error) {
        next(error)
    }
}

const createPost = async (req, res, next) => {
    try {
        const insertedPost = await post.postPost(req)
        res.status(201).send(insertedPost)
    }

    catch (error) {
        next(error)
    }
}

module.exports = { createPost ,findAllPosts}
