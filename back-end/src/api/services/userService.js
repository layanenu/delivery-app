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

const getUsersByAdmin = async () => {
  const users = await User.findAll({
    where: { role: ['seller', 'customer'] },
    
  });
  if (!users) return null;
  return users;
};

const remove = async (email) => {
  console.log(email);
  await User.destroy({ where: { email } });
};

module.exports = { getSellers, getUsers, remove, getUsersByAdmin };
