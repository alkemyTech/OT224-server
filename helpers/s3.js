const S3 =  require('aws-sdk/clients/s3')
const fs = require('fs')
const config = require('../config/config')

const storage = new S3({
    accessKeyId:config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
   
})

const getBucket = ()=>{
    return storage.listBuckets().promise()
}
 
//Cargar archivos al bucket
const uploadToBacket = (file)=>{
    const fileName= file.name
   const stream= fs.createReadStream(file.tempFilePath)
   const params = {
    Bucket: config.aws.s3BucketName,
    Key: fileName,
    Body: stream
   }
   return storage.upload(params).promise()
}

module.exports= {
    uploadToBacket,
    getBucket
}