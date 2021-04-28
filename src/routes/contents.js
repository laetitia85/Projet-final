const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
require("dotenv").config();
const isTokenIsValid = require('../middlewares/auth');

app.get("/contents",  (req, res) => {
    sql.query("SELECT * FROM contents", (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    });
  });

app.post("/add-contents", isTokenIsValid, function(req, res) {
    try {
      let objet = {
        title: req.body.title,
        id_user_a: req.body.id_user_a,
        date: req.body.date,
        category: req.body.category,
        duration: req.body.duration,
        content_type: req.body.content_type,
        content: req.body.content
      };
      sql.query(`INSERT INTO contents SET ?`, objet, (err, result) => {
        if (err) {
          console.log("error", err);
        }
        res.status(200).json({
          msg: "Le contenu a bien été ajouté",
          id_c: result.insertId
        });
      });
    } catch (err) {
      console.log(err);
    }
  }),
    
  app.get("/contents/:id", (req, res) => {
    sql.query(
      `SELECT contents.*, artists_users.picture_profil, artists_users.first_name 
      FROM contents 
      INNER JOIN artists_users 
      ON artists_users.id_a = contents.id_user_a 
      WHERE contents.id_user_a = ${req.params.id}`,
      (err, result) => {
        if (err) {
                  throw err;
                }
                res.send(result);
              }
            );
          });
  
  app.get("/category",  (req, res) => {
    sql.query("SELECT category FROM contents", (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    });
  });
  
  app.get("/category/:select", (req, res) => {
    sql.query(
      `SELECT * FROM contents WHERE contents.category = '${req.params.select}'`,
      (err, response) => {
        if (err) {
          throw err;
        }
        res.send(response);
      }
    );
  });

  app.delete("/contents/:contentsID", (req, res) => {
    sql.query(
      `DELETE FROM contents WHERE id_c ='${req.params.contentsID}'`,
      function(err, result) {
        if (err) {
          res.status(400).send("Erreur");
        }
        res.status(200).send("Votre post à bien été supprimé");
      }
    );
  });

  module.exports = app;