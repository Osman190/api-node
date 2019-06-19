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
  let avatar;
  let id = req.params.userId;
  axios
    .get(`https://reqres.in/api/users/${id}`)
    .then(item => {
      avatar = item.data.data.avatar;
      console.log(avatar);
      res.send({ avatar });
    })
    .catch(err => {
      console.error(err);
      return err;
    });
});

module.exports = router;
