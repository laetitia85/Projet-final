const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const isTokenProIsValid = require('../middlewares/authPro');


app.get("/usersPro", (req, res) => {
    sql.query("SELECT * FROM pro_users", (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    });
  });
  
  app.post("/usersPro/sign-up-pro", (req, res) => {
    try {
      bcrypt.hash(req.body.password, saltRounds).then(function(passwordHash) {
        sql.query(
          `INSERT INTO pro_users (name,first_name,email,password,pro_type,picture,enterprise_name,siret_number) 
          VALUES (
          '${req.body.name}',
          '${req.body.first_name}',
          '${req.body.email}',
          '${passwordHash}',
          '${req.body.pro_type}',
          '${req.body.picture}',
          '${req.body.enterprise_name}',
          '${req.body.siret_number}')`, (err, result) => {

            if(err == null) res.status(200).send("Vous etes bien enregistrer");
            else res.status(401).json("Erreur enregistrement")
          });
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  app.post("/usersPro/sign-in-pro", (req, res) => {
    sql.query(
      `SELECT * FROM pro_users WHERE email = '${req.body.email}'`,
      (err, result) => {
        if (result[0]) {
          bcrypt.compare(req.body.password, result[0].password, function(
            erro,
            resultat
          ) {
            if (resultat) {
              let tokenPro = jwt.sign(
                {
                  id_p: result[0].id_p,
                  email: result[0].email,
                  first_name: result[0].first_name,
                  picture: result[0].picture
                },
                "process.env.jwtKey",
                {
                  expiresIn: 86400 // expires in 24 hours
                }
              );
              res
                .status(200)
                .json({ auth: true, tokenPro: tokenPro, id_p: result[0].id_p });
            } else {
              res.status(205).send({
                msg: "Le mot de passe est incorrect"
              });
            }
          });
        } else {
          res.status(406).send({
            msg: "Utilisateur inconnu"
          });
        }
      }
    );
  });

  app.put("/usersPro/:id", (req, res) => {
    try {
      let x = Object.keys(req.body);
      console.log("x", x);
      var myQuery = `UPDATE pro_users SET `;
      if (req.body.password) {
        bcrypt.hash(req.body.password, saltRounds).then(function(passwordHash) {
          for (let i = 0; i < x.length; i++) {
            if ((x[i] == "password") & (i == x.length - 1)) {
              myQuery = myQuery + `${x[i]}` + " = " + `'${passwordHash}'`;
            } else if ((x[i] == "password") & (i != x.length - 1)) {
              myQuery =
                myQuery + `${x[i]}` + " = " + `'${passwordHash}'` + ", ";
            } else if (i == x.length - 1) {
              myQuery = myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'`; // req.body.name === req.body[name]
            } else {
              myQuery =
                myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'` + ", ";
            }
          }
          myQuery = myQuery + ` WHERE id_p = '${req.params.id}'`;
          console.log(myQuery);
          sql.query(myQuery, function(err, result) {
            if (err) throw err;
            res.status(200).send("it is ok with password hash ");
          });
        });
      } else {
        for (let i = 0; i < x.length; i++) {
          if (i == x.length - 1) {
            myQuery = myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'`; // req.body.name === req.body[name]
          } else {
            myQuery =
              myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'` + ", ";
          }
        }
        myQuery = myQuery + `WHERE id_p = '${req.params.id}'`;
        console.log(myQuery);
        sql.query(myQuery, function(err, result) {
          if (err) throw err;
          res.status(200).send("it is ok ");
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

app.delete("/usersPro/:usersProID", (req, res) => {
  sql.query(
    `DELETE FROM pro_users WHERE id_p ='${req.params.usersProID}'`,
    function(err, result) {
      if (err) {
        res.status(400).send("Erreur");
      }
      res.status(200).send("Votre compte à bien été supprimé");
    }
  );
});

  module.exports = app;