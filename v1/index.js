var face = require("./face");
var audio = require("./audio");
var router = require("express").Router();
//var bodyParser = require('body-parser');
// router.use(bodyParser.raw())

router.route("/face").post(function(req, res) {
  let b64 = [];
  req
    .on("data", chunk => {
      b64.push(chunk);
    })
    .on("end", () => {
      b64 = Buffer.concat(b64).toString();
      face.runRequest(b64, body => {
        // let data = JSON.parse(body);
        // data = data[0].faceAttributes.emotion;
        // console.log(data)
        res.header("Access-Control-Allow-Origin", "*"); // enable cross-origin resource sharing (CORS)
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.parse(body)); // only send first face
      });
    });
});
router.route("/audio").get(function(req, res) {
  console.log("audio");
  const audioFile = "/Users/willtaylor/downloads/AngerDemo.mp3";
  audio.runRequest(audioFile, function(data) {
    let standardData = {};
    for (i in data) {
      if (data[i].emotion === "happy") {
        data[i].emotion = "happiness";
      } else if (data[i].emotion === "sad") {
        data[i].emotion = "sadness";
      } else if (data[i].emotion === "angry") {
        data[i].emotion = "anger";
      }
      standardData[data[i].emotion] = data[i].score;
    }
    res.send(standardData);
  });
});

module.exports = router;
