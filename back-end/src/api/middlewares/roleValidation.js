const roleValidation = async (req, res, next) => {
  const { role } = req.body;
  const validRoles = ['customer', 'seller', 'administrator'];
  if (!role) {
    req.body.role = 'customer';
  }

  if (validRoles.includes(role)) {
    return next();
  }
  
  return res.sendStatus(400);
};

module.exports = { roleValidation };
