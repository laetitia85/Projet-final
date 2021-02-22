const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // parse requests of content-type: application/json

app.use(bodyParser.urlencoded({ extended: true }));

// const routes = require("./routes/router.js");
const users = require("./routes/users.js");
const usersPro = require("./routes/usersPro.js");
const contents = require("./routes/contents.js");
const comments = require("./routes/comments.js");
const admin = require("./routes/admin.js")
app.use("/", users, usersPro, contents, comments, admin);


app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
