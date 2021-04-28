const jwtPro = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    let tokenPro = req.headers['authorization'];
    jwtPro.verify(tokenPro, process.env.JWT_SECRET, (err, decoded) => {
        next();
    });
  }
};