const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
require("dotenv").config();
// const isTokenProIsValid = require('../middlewares/authPro');

app.get("/comments", (req, res) => {
    sql.query("SELECT * FROM comments", (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    });
  });
  
  app.post("/add-comments",  (req, res) => {
    try {
      let objet = {
        comments: req.body.comments,
        id_post: req.body.id_post,
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

  app.get("/comments/:id", (req, res) => {
    sql.query(
      `SELECT comments.id_com, comments.comments, comments.id_post FROM comments INNER JOIN contents ON contents.id_user_a = comments.id_post WHERE comments.id_post = ${req.params.id}`,
      (err, result) => {
        if (err) {
                  throw err;
                }
                res.send(result);
              }
            );
          });

  module.exports = app;