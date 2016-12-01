var AWS             = require('aws-sdk');
var putToS3         = require('./put_to_s3');
var handlePutResult = require('./handle_put_result');

module.exports = function(res, bucket, metadata, callback) {
  if(res.statusCode != 200) {
    console.log("Received invalid status: " + res.statusCode);
    throw "Received invalid status: " + res.statusCode;
  }
  
  putToS3(bucket, res, metadata, function(s3Url){
    handlePutResult(s3Url, callback);
  });
}
