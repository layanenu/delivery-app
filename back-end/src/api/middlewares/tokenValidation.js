const jwt = require('jsonwebtoken');
const fs = require('fs');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8') || 'secret';
  console.log(secret);

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.locals.userId = decoded.data.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid' });
  }
};

module.exports = { tokenValidation };
