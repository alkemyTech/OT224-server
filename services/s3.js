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
const uploadToBucket = async (file)=>{
   const fileName= file.name
   const stream= fs.createReadStream(file.tempFilePath)
   const params = {
    Bucket: config.aws.s3BucketName,
    Key: fileName,
    Body: stream,
    ACL: 'public-read',
    ContentType: file.mimetype
   }
   const upload= await storage.upload(params).promise()
   return  upload.Location  
}

module.exports= {
    uploadToBucket,
    getBucket
}
