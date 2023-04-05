const { User } = require('../../database/models');

const getSellers = async () => {
  const sellers = await User.findAll({
    attributes: { exclude: ['password', 'email'] },
    where: { role: 'seller' },
  });
  if (!sellers) return null;
  return sellers;
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  if (!users) return null;
  return users;
};

module.exports = { getSellers, getUsers };
