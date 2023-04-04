const md5 = require('md5');
const { User } = require('../../database/models');
const { tokenGenerate } = require('../utils/JWT');

async function register(name, email, password) {
  try {
    const user = await User.create({
      name,
      email,
      password: md5(password),
      role: 'customer',
    });
    
    const token = tokenGenerate(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  } catch (error) {
    return null;
  }
}

module.exports = { register };
