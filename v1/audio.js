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
  runRequest: function (audioFile, cb) {
      const deepAffectsAPIKey = "dDdPzdT8Q9iHjnyQEIIIxQHwp7mTiEoy";
      // Initialization, denoising, emotion recognition

      let DeepAffects = require('deep-affects');

      let defaultClient = DeepAffects.ApiClient.instance;

// Configure API key authorization: UserSecurity
      let UserSecurity = defaultClient.authentications['UserSecurity'];
      UserSecurity.apiKey = deepAffectsAPIKey;
      let emotionAPI = new DeepAffects.EmotionApi();
      let body = DeepAffects.Audio.fromFile(audioFile); // {Audio} Audio object that needs to be denoised.
      let callback = function (error, data, response) {
          if (error) {
              console.error(error);
          } else {
              cb(data)
              console.log('API called successfully. Returned data: ' + JSON.stringify(response));
          }
      };
      emotionAPI.syncRecogniseEmotion(body, callback);
// You can make 5 requests per minute to each API. The requests are capped at 100 requests per day.
  }
};
