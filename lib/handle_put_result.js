module.exports = function(s3Url, callback) {
  var response = {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({
      s3_url: s3Url
    }),
  };

  callback(null, response);
}
