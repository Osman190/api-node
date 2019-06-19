const express = require("express");
const router = express.Router();
const fs = require("fs");
var https = require("https");
const image2base64 = require("image-to-base64");
const axios = require("axios");

function saveImageToDisk(url, id) {
  var file = fs.createWriteStream("./downloads/img" + id + ".jpg");
  var request = https.get(url, function(response) {
    response.pipe(file);
  });
}

router.get("/api/user/:userId", (req, res) => {
  let data;
  let id = req.params.userId;
  axios
    .get(`https://reqres.in/api/users/${id}`)
    .then(values => {
      data = values.data.data;
      res.send({ data });
    })
    .catch(err => {
      console.error(err);
      return err;
    });
});
router.get("/api/user/:userId/avatar", (req, res) => {
  let id = req.params.userId;
  axios
    .get(`https://reqres.in/api/users/${id}`)
    .then(item => {
      imgUrl = item.data.data.avatar;
      saveImageToDisk(imgUrl, id);
      return imgUrl;
    })
    .then(url => {
      image2base64(url)
        .then(response => {
          console.log(response);
          res.send({ response });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(err => {
      console.error(err);
      return err;
    });
});

router.delete("/api/user/:userId/avatar", (req, res) => {
  console.log(req.file);
  let avatar;
  let id = req.params.userId;
  let fileInfo = [];
  axios
    .get(`https://reqres.in/api/users/${id}`)
    .then(item => {
      avatar = item.data.data.avatar;
      res.send({ avatar });
    })
    .catch(err => {
      console.error(err);
      return err;
    });
});

module.exports = router;
