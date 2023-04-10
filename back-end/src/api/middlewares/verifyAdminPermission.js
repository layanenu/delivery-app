const verifyAdminPermission = (_req, res, next) => {
  const { role } = res.locals;
  console.log(role);
  if (role !== 'administrator') {
    return res.sendStatus(401);
  }

  next();
};

module.exports = { verifyAdminPermission };
