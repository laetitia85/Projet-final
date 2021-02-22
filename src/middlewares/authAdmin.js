const jwtAdmin = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    let tokenAdmin = req.headers.authorization;
    jwtAdmin.verify(tokenAdmin, process.env.jwtKeyAdmin, (err, decoded) => {
       console.log(decoded)
      if (decoded.id_admin === req.body.id_admin) {
        // console.log("cccccccc");
        next();
      } else {
        res.status(400).send({ msg: "invalid token " });
      }
    });
  }
};
