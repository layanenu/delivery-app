const jwt = require('jsonwebtoken');
const fs = require('fs');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8') || 'secret';

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded.data.id) {
      throw new Error();
    }
    res.locals.userId = decoded.data.id;
    res.locals.role = decoded.data.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid' });
  }
};

module.exports = { tokenValidation };
