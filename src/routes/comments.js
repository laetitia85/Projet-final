const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
require("dotenv").config();
const isTokenProIsValid = require('../middlewares/authPro');

app.get("/comments", (req, res) => {
    sql.query("SELECT * FROM comments", (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    });
  });
  
  app.post("/add-comments", isTokenProIsValid, (req, res) => {
    try {
      let objet = {
        comments: req.body.comments,
      };
      sql.query(`INSERT INTO comments SET ?`, objet, (err, result) => {
          if (err) {
            console.log("error", err);
          }
          res.status(200).json({
            msg: "Le commentaire a bien été envoyé",
            id_com: result.insertId
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  })

          app.delete("/comments/:commentsID", (req, res) => {
            sql.query(
              `DELETE FROM comments WHERE id_com ='${req.params.commentsID}'`,
              function(err, result) {
                if (err) {
                  res.status(400).send("Erreur");
                }
                res.status(200).send("Le commentaire à bien été supprimé");
              }
            );
          });
        

  module.exports = app;