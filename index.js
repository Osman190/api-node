const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./web");
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", routes);

app.set("port", 3000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → on PORT ${server.address().port}`);
});

module.exports = app;
