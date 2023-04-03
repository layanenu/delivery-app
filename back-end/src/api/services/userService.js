const { User } = require('../../database/models');

const getSellers = async () => {
  const sellers = await User.findAll({
    attributes: { exclude: ['password', 'email'] },
    where: { role: 'seller' },
  });
  if (!sellers) return null;
  return sellers;
};

module.exports = { getSellers };
