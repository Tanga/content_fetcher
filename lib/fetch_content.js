var request = require('request');
var handleFetchResult = require('./handle_fetch_result');

module.exports = function (body, lambdaCallback) {
  request(body.url, function(error, res){
    if(error) { console.log(error); return }
    handleFetchResult(res, body.s3_bucket, body.s3_metadata, lambdaCallback);
  });
}
