const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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

app.post("/users/sign-up", (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds).then(function(passwordHash) {
      sql.query(
        `INSERT INTO artists_users (name,first_name,email,password,picture_profil) VALUES ('${req.body.name}','${req.body.first_name}','${req.body.email}','${passwordHash}','${req.body.picture_profil}')`
      );
    });
    res.status(200).send("Vous etes bien enregistrer");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
