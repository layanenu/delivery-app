const roleValidation = async (req, res, next) => {
  const { role } = req.body;
  const validRoles = ['customer', 'seller', 'administrator'];

  if (!role) {
    req.body.role = 'customer';
    return next();
  }

  if (validRoles.includes(role)) {
    return next();
  }

  return res.status(400).json({ message: 'Role inválida' });
};

module.exports = { roleValidation };
