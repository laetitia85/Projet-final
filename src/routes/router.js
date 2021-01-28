const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const isTokenIsValid = require('../middlewares/auth');

//ARTISTS_USERS
app.get("/users", (req, res) => {
  sql.query("SELECT * FROM artists_users", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/users/sign-up", (req, res) => {
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
              name: result[0].name,
              first_name: result[0].first_name,
              email: result[0].email,
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

app.get("/contents", (req, res) => {
  sql.query("SELECT * FROM contents", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/add-contents", function(req, res) {
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
  app.get("/users/:id", (req, res) => {
    sql.query(
      `SELECT artists_users.id_a, artists_users.name , artists_users.email, artists_users.password, artists_users.picture_profil , contents.title, contents.id_c, contents.date, contents.duration, contents.category, contents.content_type, contents.content  FROM artists_users INNER JOIN contents ON contents.id_user_a = artists_users.id_a WHERE contents.id_user_a = ${req.params.id}`,
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
              } else {
                res.json(resultat);
              }
            }
          );
        }
      }
    );
  });

app.get("/contents/:id", (req, res) => {
  sql.query(
    `SELECT contents.id_c, contents.title, contents.id_user_a, contents.date, contents.category, contents.duration, contents.content_type, artists_users.picture_profil, artists_users.first_name, contents.content FROM contents INNER JOIN artists_users ON artists_users.id_a = contents.id_user_a WHERE contents.id_user_a = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

app.get("/category", (req, res) => {
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

app.delete("/users/:usersID", (req, res) => {
  sql.query(
    `DELETE FROM artists_users WHERE id_a ='${req.params.usersID}'`,
    function(err, result) {
      if (err) {
        res.status(400).send("Erreur");
      }
      res.status(200).send("Votre compte à bien été supprimé");
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

//PRO_USERS
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
        `INSERT INTO pro_users (name,first_name,email,password,pro_type,picture,enterprise_name,siret_number) VALUES ('${req.body.name}','${req.body.first_name}','${req.body.email}','${passwordHash}','${req.body.pro_type}','${req.body.picture}','${req.body.enterprise_name}', '${req.body.siret_number}')`
      );
    });
    res.status(200).send("Vous etes bien enregistrer");
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

app.get("/comments", (req, res) => {
  sql.query("SELECT id_com, comments FROM comments", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/add-comments", (req, res) => {
  try {
    sql.query(
      `INSERT INTO comments (comments) VALUES ('${req.body.comments}')`,
      (err, result) => {
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
}),
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

//ADMIN

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

// app.delete("/admin/:ID", (req, res) => {
//     let IdUser = {id_a: `${req.params.ID}`}
//     let IdUserPro = {id_p: `${req.params.ID}`}
//     let IdC = {id_c: `${req.params.ID}`}
//     let IdCom = { id_com:  `${req.params.ID}`}

//   sql.query(
//     `DELETE FROM artists_users, pro_users, contents, comments ?` ,[IdUser,IdUserPro,IdC,IdCom],
//     (err, result) => {
//       if (err) {
//         res.status(400).send("Erreur");
//       }
//       res.status(200).send("Données supprimées avec succès");
//     }
//   );
// });

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

app.delete("/adminPro/:usersProID", (req, res) => {
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

app.delete("/adminC/:content", (req, res) => {
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
