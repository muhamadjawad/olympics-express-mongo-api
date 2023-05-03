const { authorsCollection } = require("../models/author");
const { CustomError } = require("../utils/customError");
const { uploadFileToS3, getImageURL } = require("../utils/s3");
const { unlink } = require('fs/promises');

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
    const files = req.files
    let path = "";
    let file = ""

    if (Array.isArray(files)) {
        file = files[0] //profileImage
    }
    else {
        CustomError("Profile Image problem")
    }

    const user = await authorsCollection.find(body);

    if (user.length === 0) {

        const bucketResult = await uploadFileToS3(file) // uplaoding to s3
        const imageKey = bucketResult.Key
        if (bucketResult) {
            //means uploaded then find image url
            path = await getImageURL(imageKey)
        }
        else {
            CustomError({ msg: "failed to uplaod image" })
        }

        const deleteFile = `${file.path}`

        try {
            await unlink(deleteFile);
        } catch (error) {
            CustomError({ msg: "Something gone wrong in deletion" })
        }

        body.imagePath = path

        const newRecord = new authorsCollection(body)
        const { _id, firstName, lastName, email, posts, imagePath } = await newRecord.save()
        const insertAuthor = { _id, firstName, lastName, email, posts, imagePath }

        return insertAuthor
    }
    else {
        CustomError(`already exists`, 403)
    }
}

module.exports = { postAuthor, getAllAuthors }