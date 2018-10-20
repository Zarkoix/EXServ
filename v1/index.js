var face = require('./face')
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
    // TODO: actually implement this lol
    console.log('audio')
  });

module.exports = router;
