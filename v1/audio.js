'use strict';
const request = require('request');
// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'd9235055757e473f85b893aafaf10e0f';
// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion'
};

module.exports = {
  runRequest: function (imageUrl, cb) {
    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
    request.post(options, (error, response, body) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }
      var data = JSON.parse(body)[0].faceAttributes
      cb(data)
      let jsonResponse = JSON.stringify(data, null, '  ');
      console.log('JSON Response\n');
      console.log(jsonResponse);
    });
  }
}
