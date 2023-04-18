const { authorsCollection } = require("../models/author");
const { postsCollection } = require("../models/post");
const { CustomError } = require("../utils/customError");

const postPost = async (req) => {
    const body = req.body

    const { title, date, authorId } = body
    const postExist = await postsCollection.find({ title, date })

    if (postExist.length === 0) {
        // const { _id, title, author, date } = await newRecord.save()
        // const newPost = { _id, title, author, date }

        // return insertPost


        const foundAuthor = await authorsCollection.findById({ _id: authorId })
        if (!foundAuthor) {
            CustomError(`Author does not exist`, 403)
        }
        else {
            const newPost = new postsCollection(body)

            foundAuthor.posts.push(newPost)
            newPost.author = foundAuthor
            const { _id, title, author, date } = await newPost.save()
            await foundAuthor.save()
            return { _id, title, author, date }
        }


    }
    else {
        CustomError(`post already exists`, 403)
    }
}

const getAllPosts = async (req) => {
    let queryObject = {}
    let apiData = postsCollection.find(queryObject)
        .populate('author')
        .exec()
    const allPosts = await apiData

    let metaData = {
        // "limit_per_page": limit,
        // "page": page,
        // "total_pages": totalPages,
        // "total_records": totalAuthors
    }

    return { metaData, allPosts }

}

module.exports = { postPost ,getAllPosts}