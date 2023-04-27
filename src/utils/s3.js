const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const AWS = require('aws-sdk');

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
        console.log("file",file)
        // console.log("fileStream", fileStream)
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: `${file.filename}.jpg`,
            ACL :"private"
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

const getImageURL = async (imageKey) => {
    const url = await s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: imageKey,
        // Expires: signedUrlExpireSeconds
    })
    console.log("url", url)
    return url
}

module.exports = {
    uploadFileToS3,
    getFileFromS3,
    getImageURL
}