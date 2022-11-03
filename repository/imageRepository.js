const AWS = require('aws-sdk');
class ImageRepository{
    constructor(){
         this.s3 = new AWS.S3({
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey
        })
    }
    uploadImage(name , image, type){
        
        return new Promise((resolve, reject)=>{
            const Key = `${name}.${type.split('/')[1]}`
            const params = {
                Bucket: process.env.s3BucketName,
                Key,
                ContentType: type,
                Body: image,
                ACL: 'public-read'
            };

            this.s3.upload(params, (err, data) => {
                if(err){
                    reject(new AppError(err.message, 502))
                }
                console.log(`File uploaded successfully. ${data}`)
                resolve(`https://${process.env.s3BucketName}.s3.amazonaws.com/${Key}`)
            },
            )
        })
    }
}

module.exports = ImageRepository;