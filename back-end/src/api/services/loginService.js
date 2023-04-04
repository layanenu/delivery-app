const md5 = require('md5');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const { tokenGenerate } = require('../utils/JWT');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== md5(password)) {
    return null;
  }
  const token = tokenGenerate(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

const loginVerify = async (token) => {
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8') || 'secret';
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { login, loginVerify };
