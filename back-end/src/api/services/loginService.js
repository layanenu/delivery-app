const { User } = require('../../database/models');

const login = async (email, _password) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = { login };