'use strict';

var request = require('request')
var handleFetchResult = require('./lib/handle_fetch_result');
var fetchContent = require('./lib/fetch_content')

module.exports.fetch = (event, context, callback) => {
  var body     = JSON.parse(event.body);

  fetchContent(body, callback)
};
