var face = require('./face')
var audio = require('./audio')
var router = require('express').Router();

router.route('/face')
  .get(function (req, res) {
    console.log('face')
    const imageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';
    face.runRequest(imageUrl, function (body) {
      res.send(body)
    })
  });
router.route('/audio')
  .get(function (req, res) {
    console.log('audio');
    const audioFile = "/Users/willtaylor/downloads/AngerDemo.mp3";
    audio.runRequest(audioFile, function (data) {
        let standardData = {};
        for (i in data) {
            if (data[i].emotion === 'happy') {
                data[i].emotion = 'happiness';
            } else if (data[i].emotion === 'sad') {
                data[i].emotion = 'sadness';
            } else if (data[i].emotion === 'angry') {
                data[i].emotion = 'anger';
            }
            standardData[data[i].emotion] = data[i].score;
        }
        res.send(standardData);
      })
  });

module.exports = router;
