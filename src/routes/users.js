const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const isTokenIsValid = require('../middlewares/auth');

app.get("/users", (req, res) => {
  sql.query("SELECT * FROM artists_users", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/users/sign-up",  (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds).then(function(passwordHash) {
      const newUser = {
        name: req.body.name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: passwordHash,
        picture_profil: req.body.picture_profil
      };
      sql.query("INSERT INTO artists_users SET ?", newUser, (err, result) => {
        if (err) {
          console.log("error:", err);
        }
        res.status(200).send(result);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/users/sign-in", (req, res) => {
  const objet = {
    email: req.body.email
  };
  sql.query(`SELECT * FROM artists_users WHERE ?`, objet, (err, result) => {
    console.log(result);
    if (result[0]) {
      bcrypt.compare(req.body.password, result[0].password, function(
        erro,
        resultat
      ) {
        if (resultat) {
          console.log(resultat);
          let token = jwt.sign(
            {
              id_a: result[0].id_a,
              email: result[0].email,
              first_name: result[0].first_name,
              picture_profil: result[0].picture_profil
            },
            "process.env.jwtKey",
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );
          res
            .status(200)
            .json({ auth: true, token: token, id_a: result[0].id_a });
        } else {
          res.status(205).send({
            msg: "Données incorrect"
          });
        }
      });
    } else {
      res.status(203).send({
        msg: "Utilisateur inconnu"
      });
    }
  });
});

app.put("/users/:id", (req, res) => {
  try {
    let x = Object.keys(req.body);
    console.log("x", x);
    var myQuery = `UPDATE artists_users SET `;
    if (req.body.password) {
      bcrypt.hash(req.body.password, saltRounds).then(function(passwordHash) {
        for (let i = 0; i < x.length; i++) {
          if ((x[i] == "password") & (i == x.length - 1)) {
            myQuery = myQuery + `${x[i]}` + " = " + `'${passwordHash}'`;
          } else if ((x[i] == "password") & (i != x.length - 1)) {
            myQuery = myQuery + `${x[i]}` + " = " + `'${passwordHash}'` + ", ";
          } else if (i == x.length - 1) {
            myQuery = myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'`; // req.body.name === req.body[name]
          } else {
            myQuery =
              myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'` + ", ";
          }
        }
        myQuery = myQuery + ` WHERE id_a = '${req.params.id}'`;
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
          myQuery = myQuery + `${x[i]}` + " = " + `'${req.body[x[i]]}'` + ", ";
        }
      }
      myQuery = myQuery + ` WHERE id_a = '${req.params.id}'`;
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

// app.delete("/users/:usersID", (req, res) => {
//   sql.query(
//     `DELETE FROM artists_users WHERE id_a ='${req.params.usersID}'`,
//     function(err, result) {
//       if (err) {
//         res.status(400).send("Erreur");
//       }
//       res.status(200).send("Votre compte à bien été supprimé");
//     }
//   );
// });

app.delete("/users/:usersID", (req, res) => {
  sql.query(
    `DELETE artists_users FROM artists_users 
    INNER JOIN contents ON artists_users.id_a = contents.id_user_a 
    WHERE id_a ='${req.params.usersID}'`,
    function(err, result) {
      if (err) {
        res.status(400).send("Erreur");
      }
      res.status(200).send("Votre compte à bien été supprimé");
    }
  );
});


  module.exports = app;