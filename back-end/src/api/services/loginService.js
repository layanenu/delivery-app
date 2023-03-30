const md5 = require('md5');
const { User } = require('../../database/models');
const { tokenGenerate } = require('../utils/JWT');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== md5(password)) {
    return null;
  }
  const token = tokenGenerate(user);

  return token;
};

module.exports = { login };
