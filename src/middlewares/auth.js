const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.jwtKey, (err, decoded) => {
       console.log(decoded)
       console.log(ccc)
      if (decoded.id_a === req.body.id_a) {
        next();
      } else {
        res.status(400).send({ msg: "invalid token " });
      }
    });
  }
};
