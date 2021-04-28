const jwtAdmin = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    let tokenAdmin = req.headers['authorization'];
    jwtAdmin.verify(tokenAdmin, process.env.JWT_SECRET, (err, decoded) => {
        next();
    });
  }
};
