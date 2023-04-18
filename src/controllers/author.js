const { authors } = require('../services')

const findAllAuthors = async (req, res, next) => {
    try {
        const { metaData, allAuthors } = await authors.getAllAuthors(req)
        res.status(200).json({
            "_metadata": metaData,
            "records": allAuthors,
        })

    } catch (error) {
        // next(error);
    }

}


const createAuthor = async (req, res, next) => {
    try {
        const insertedAuthor = await authors.postAuthor(req)
        res.status(201).send(insertedAuthor)
    }

    catch (error) {
        next(error)
    }
}

module.exports = { createAuthor, findAllAuthors }