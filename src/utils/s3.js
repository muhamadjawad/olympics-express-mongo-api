const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const AWS = require('aws-sdk');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
var path = require('path')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY

const config = {
    // apiVersion: "2010-12-01", latest by default
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION
}


// configure S3 Bucket 

AWS.config.update(config)

const s3 = new AWS.S3()



//upload file to s3

const uploadFileToS3 = (file) => {

    try {
        const fileStream = fs.createReadStream(file.path)
        fileExtension = path.extname(file.originalname)

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,//JSON.stringify(file, null, 2),
            Key: `${file.filename}${fileExtension}`,
            ContentType: file.mimeType
            // ACL: "private"
        }
        return s3.upload(uploadParams).promise()

    } catch (error) {
        console.log("Error", error)
    }
}

const getFileFromS3 = (imageKey) => {


    const downloadParams = {
        Key: imageKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()

}

const getImageURL = async (imageKey, nextError) => {

    try {
        const getObjectParams = {
            Bucket: bucketName,
            Key: `${imageKey}`,
            ContentType: "image/jpeg",
        }

        const command = new GetObjectCommand(getObjectParams)
        const client = new S3Client({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            },
            region: region
        })


        const url = await getSignedUrl(client, command, { expiresIn: 3600 })
        return url


    } catch (error) {
        console.log("Error", error)
        nextError(error)
    }
}

module.exports = {
    uploadFileToS3,
    getFileFromS3,
    getImageURL
}