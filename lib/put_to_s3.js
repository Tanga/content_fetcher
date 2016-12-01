var http = require('http')
const uuidV1 = require('uuid/v1')
var AWS = require('aws-sdk');
var s3 = new AWS.S3()

module.exports = function(bucket, res, metadata, s3Callback) {
  var params = {
    Body: res.body,
    Bucket: bucket,
    Key: uuidV1(),
    Metadata: metadata,
    ACL: 'public-read',
    ContentType: res.headers['content-type'],
    ContentDisposition: 'inline'
  };

  var upload = s3.upload(params).promise();

  upload.then(function(result) {
    s3Callback(result.Location);
  }).catch(function(error){
    console.log("error", error);
    throw error;
  });
}
