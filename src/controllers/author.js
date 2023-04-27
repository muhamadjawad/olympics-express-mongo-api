const { authors } = require('../services')
const { uploadFileToS3, getFileFromS3, getImageURL } = require('../utils/s3')
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const fs = require('fs')
const utils = require('util')

const unlinkFile = utils.promisify(fs.unlink)

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

const uploadImage = async (req, res, next) => {
    try {

        const file = req.file
        const info = req.body.description

        const result = await uploadFileToS3(file)
        // await unlinkFile(file.path)
        let response = {
            filename: file.originalname,
            type: "image",
            imagePath: `/images/${result.Key}`
        }

        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
}

const downloadImage = async (req, res, next) => {
    try {
        const { key } = req.params
        const imageKey = key

        const url = await getImageURL(imageKey)
        const readStream = getFileFromS3(imageKey)
        // console.log("readStream", readStream)
        readStream.pipe(res)

        let response = {
            // filename: file.originalname,
            type: "image",
            imagePath: `/images/${imageKey}`
        }
        res.status(200).send(response)

    } catch (error) {
        next(error)
    }
}

module.exports = { createAuthor, findAllAuthors, uploadImage, downloadImage }