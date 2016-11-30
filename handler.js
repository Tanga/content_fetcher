'use strict';
var request = require('request-promise')
var AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'
var s3 = new AWS.S3()
const uuidV1 = require('uuid/v1')

module.exports.fetch = (event, context, callback) => {
  var url = event.url
  var metadata = event.s3_metadata
  var bucket = event.s3_bucket

  request({uri: url, encoding: null}).then(function(image) {
    uploadToS3(bucket, image, metadata, function(s3Url) {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          s3_url: s3Url,
          input: event,
        }),
      };

      callback(null, response);
    })
  })



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

function uploadToS3 (bucket, image, metadata, callback) {
  var params = {
    Body: image,
    Bucket: bucket,
    Key: uuidV1(),
    Metadata: metadata,
    ACL: 'public-read',
    ContentType: image.mime,
    ContentDisposition: 'inline'
  }

  const upload = s3.upload(params).promise()

  return upload.then(function(result) {
    return {url: result.Location}
  })
}
