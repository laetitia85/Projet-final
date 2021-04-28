const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("lol")
  console.log(req.headers['authorization'])
  if (req.headers['authorization']) {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       console.log(decoded)
    
      next();
 
    });
  }
};
