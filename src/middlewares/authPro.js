const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    let tokenPro = req.headers.authorization;
    jwt.verify(tokenPro, process.env.jwtKey, (err, decoded) => {
       console.log(decoded)
      if (decoded.id_p === req.body.id_p) {
        next();
      } else {
        res.status(400).send({ msg: "invalid token " });
      }
    });
  }
};