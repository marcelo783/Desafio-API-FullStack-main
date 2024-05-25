const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
const secury = process.env.TOKEN_SECRET;


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  

  if (!token) {
    return res.status(401).json({ message: 'token não informado' });
  }


  jwt.verify(token, secury, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na Autenticação' });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;