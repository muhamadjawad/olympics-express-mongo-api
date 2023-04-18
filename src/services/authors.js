const { authorsCollection } = require("../models/author");
const { CustomError } = require("../utils/customError");

const getAllAuthors = async (req) => {
    
    let totalAuthors = await authorsCollection.find().estimatedDocumentCount()

    let queryObject = {}
    let apiData = authorsCollection.find(queryObject)
        .populate('posts')
        .exec()
    const allAuthors = await apiData

    let metaData = {
        // "limit_per_page": limit,
        // "page": page,
        // "total_pages": totalPages,
        // "total_records": totalAuthors
    }

    return { metaData, allAuthors }

}

const postAuthor = async (req) => {
    const body = req.body
    // const { name, date, edition, winner } = body
    const user = await authorsCollection.find(body);

    if (user.length === 0) {
        const newRecord = new authorsCollection(body)
        const { _id, firstName, lastName, email, posts } = await newRecord.save()
        const insertAuthor = { _id, firstName, lastName, email, posts }

        return insertAuthor
    }
    else {
        CustomError(`already exists`, 403)
    }
}

module.exports = { postAuthor, getAllAuthors }