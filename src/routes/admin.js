const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const isTokenAdminIsValid = require('../middlewares/authAdmin');

app.get("/admin", (req, res) => {
  sql.query("SELECT * FROM admin", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/admin/sign-up", (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds).then(function(passwordHash) {
      const adminUser = {
        name: req.body.name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: passwordHash,
        picture_profil_a: req.body.picture_profil_a
      };
      sql.query("INSERT INTO admin SET ?", adminUser, (err, result) => {
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

app.post("/admin/sign-in", (req, res) => {
  const objet = {
    email: req.body.email
  };
  sql.query(`SELECT * FROM admin WHERE ?`, objet, (err, result) => {
    console.log(result);
    if (result[0]) {
      bcrypt.compare(req.body.password, result[0].password, function(
        erro,
        resultat
      ) {
        if (resultat) {
          console.log(resultat);
          let tokenAdmin = jwt.sign(
            {
              id_admin: result[0].id_admin,
              email: result[0].email,
              first_name: result[0].first_name,
              picture_profil_a: result[0].picture_profil_a
            },
            "process.env.jwtKeyAdmin",
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );
          res
            .status(200)
            .json({
              authAdmin: true,
              tokenAdmin: tokenAdmin,
              id_admin: result[0].id_admin
            });
        } else {
          res.status(205).send({
            msg: "Données incorrect"
          });
        }
      });
    } else {
      res.status(203).send({
        msg: "Admin inconnu"
      });
    }
  });
});

app.put("/admin/:id", (req, res) => {
    try {
      let x = Object.keys(req.body);
      console.log("x", x);
      var myQuery = `UPDATE admin SET `;
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
          myQuery = myQuery + ` WHERE id_admin = '${req.params.id}'`;
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
        myQuery = myQuery + `WHERE id_admin = '${req.params.id}'`;
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
  
  app.delete("/admin/:adminID", (req, res) => {
    sql.query(
      `DELETE FROM admin WHERE id_admin ='${req.params.adminID}'`,
      function(err, result) {
        if (err) {
          res.status(400).send("Erreur");
        }
        res.status(200).send("Votre compte à bien été supprimé");
      }
    );
  });
  
  
  app.delete("/adminA/:usersID", (req, res) => {
    sql.query(
      `DELETE FROM artists_users WHERE id_a ='${req.params.usersID}'`,
      function(err, result) {
        if (err) {
          res.status(400).send("Erreur");
        }
        res.status(200).send("Compte utilisateur artiste supprimé");
      }
    );
  });
  
  app.delete("/adminP/:usersProID", (req, res) => {
    sql.query(
      `DELETE FROM pro_users WHERE id_p ='${req.params.usersProID}'`,
      function(err, result) {
        if (err) {
          res.status(400).send("Erreur");
        }
        res.status(200).send("Compte utilisateur professionnel supprimé");
      }
    );
  });
  
  app.delete("/adminC/:content",  (req, res) => {
    sql.query(
      `DELETE FROM contents WHERE id_c ='${req.params.content}'`,
      function(err, result) {
        if (err) {
          res.status(400).send("Erreur");
        }
        res.status(200).send("Contenu supprimé");
      }
    );
  });
  
  app.delete("/adminCom/:com", (req, res) => {
    sql.query(`DELETE FROM comments WHERE id_com ='${req.params.com}'`, function(
      err,
      result
    ) {
      if (err) {
        res.status(400).send("Erreur");
      }
      res.status(200).send("Commentaire supprimé");
    });
  });
  
  module.exports = app;