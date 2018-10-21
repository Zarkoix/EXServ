var face = require('./face')
var audio = require('./audio')
var router = require('express').Router();
//var bodyParser = require('body-parser');
// router.use(bodyParser.raw())

router.route('/face')
  .post(function (req, res) {
    let b64 = [];
    req.on('data', (chunk) => {
      b64.push(chunk);
    }).on('end', () => {
      b64 = Buffer.concat(b64).toString();
      face.runRequest(b64, function (body) {
        var data = body
        console.log(data)
        res.send(data) // only send first face
      })
    });
  });
router.route('/audio')
  .get(function (req, res) {
    // TODO: actually implement this lol
    console.log('audio')
  });

module.exports = router;
