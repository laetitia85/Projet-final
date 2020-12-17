const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const jwt = require("jsonwebtoken");
require("dotenv").config();

app.get("/users", (req, res) => {
  sql.query("SELECT id_a, name FROM artists_users", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

module.exports = app;