const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerate = (user) => {
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8') || 'secret';
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = { tokenGenerate };
