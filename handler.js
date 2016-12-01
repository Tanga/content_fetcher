'use strict';

var request = require('request')
var handleFetchResult = require('./lib/handle_fetch_result');

module.exports.fetch = (event, context, callback) => {
  var body     = JSON.parse(event.body);
  var metadata = body.s3_metadata;
  var bucket   = body.s3_bucket;

  request(body.url, function(error, res, body){
    handleFetchResult(res, bucket, metadata, callback);
  });
};
