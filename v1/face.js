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

var dataURItoBuffer = function (dataURL, callback) {
    var buff = new Buffer(dataURL.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
    callback(buff);
};

var sendImageToMicrosoftDetectEndPoint = function (imageData, callback) {
    console.log('Entered helper');
    dataURItoBuffer(imageData, function (buff) {
        request.post({
            url: uriBase,
            qs: params,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            body: buff
        }, function (err, httpResponse, body) {
            callback(body);
        });
    })
}

module.exports = {
  runRequest: function (imageB64, cb) {
    // const options = {
    //     uri: uriBase,
    //     qs: params,
    //     body: makeblob(imageB64),
    //     headers: {
    //         'Content-Type': 'application/octet-stream',
    //         'Ocp-Apim-Subscription-Key' : subscriptionKey
    //     }
    // };
    // request.post(options, (error, response, body) => {
    //   if (error) {
    //     console.log('Error: ', error);
    //     return;
    //   }
    //   // console.log(body)
    //   const bodyJSON = JSON.parse(body)
    //   var data = bodyJSON[0].faceAttributes
    //   cb(data)
    //   let jsonResponse = JSON.stringify(data, null, '  ');
    //   console.log('JSON Response\n');
    //   console.log(jsonResponse);
    // });
    sendImageToMicrosoftDetectEndPoint(imageB64, function(body){
      cb(body)
    })
  }
}
