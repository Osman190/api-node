const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require("axios");

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
router.post("/api/user/:userId/avatar", (req, res) => {
  console.log(req.file);
  let avatar;
  let id = req.params.userId;
  let fileInfo = [];
  axios
    .get(`https://reqres.in/api/users/${id}`)
    .then(item => {
      for (let i = 0; i < item.data.data; i++) {
        fileInfo.push({
          originalName: req.files[i].originalName,
          size: req.files[i].size,
          b64: new Buffer(fs.readFileSync(req.files[i].path)).toString("base64")
        });
        fs.unlink(req.files[i].path);
      }
      avatar = item.data.data.avatar;
      res.send({ avatar });
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
