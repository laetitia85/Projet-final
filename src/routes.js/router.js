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

  
app.get("/contents", (req, res) => {
    sql.query(
      "SELECT id_c, title, date, id_user_a, category FROM contents",
      (err, response) => {
        if (err) {
          throw err;
        }
        res.send(response);
      }
    );
  });

  

app.post("/contents", (req, res) => {
    try {
      let resul = sql.query(
        `INSERT INTO contents (title,id_user_a,date,category,duration,content_type) VALUES ('${req.body.title}','${req.body.id_user_a}','${req.body.date}','${req.body.category}','${req.body.duration}','${req.body.content_type}')`,
        (error, result) => {
          console.log(resul);
          res.status(200).json({
            msg: "Le contenu a bien été ajouter",
            id: result.insertId,
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

  

app.get("/users/:id", (req, res) => {
    sql.query(
      `SELECT artists_users.id_a, artists_users.name , artists_users.email, artists_users.password, artists_users.picture_profil , contents.title, contents.id_c, contents.date, contents.duration, contents.category, contents.content_type  FROM artists_users INNER JOIN contents ON contents.id_user_a = artists_users.id_a WHERE contents.id_user_a = ${req.params.id}`,
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length != 0) {
          res.json(result);
        } else {
          sql.query(
            `SELECT artists_users.name, artists_users.email, artists_users.password, artists_users.picture_profil FROM artists_users WHERE artists_users.id_a = ${req.params.id}`,
            (err, resultat) => {
              if (err) {
                throw err;
              }
              if (resultat) {
                res.json(resultat);
              }
            }
          );
        }
      }
    );
  });

module.exports = app;
