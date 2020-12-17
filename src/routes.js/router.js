const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
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



app.post("/users/sign-in", (req, res) => {
    sql.query(
      `SELECT * FROM artists_users WHERE email = '${req.body.email}'`,
      (err, result) => {
        if (result[0]) {
          bcrypt.compare(req.body.password, result[0].password, function(
            erro,
            resultat
          ) {
            if (resultat) {
              let token = jwt.sign(
                { id: result[0].id, email: result[0].email },
                "process.env.jwtKey",
                {
                  expiresIn: 86400, // expires in 24 hours
                }
              );
              res
                .status(200)
                .json({ auth: true, token: token, id: result[0].id });
            } else {
              res.status(205).send({
                msg: "Le mot de passe est incorrect",
              });
            }
          });
        } else {
          res.status(406).send({
            msg: "Utilisateur inconnu",
          });
        }
      }
    );
  });

module.exports = app;
