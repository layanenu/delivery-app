const md5 = require('md5');
const { User } = require('../../database/models');
const { tokenGenerate } = require('../utils/JWT');

async function register(name, email, password, role) {
  try {
    const user = await User.create({
      name,
      email,
      password: md5(password),
      role,
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
