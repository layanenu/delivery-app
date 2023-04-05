const verifyAdminPermission = (_req, res, next) => {
  const { role } = res.locals;
  if (role !== 'administrator') {
    return res.sendStatus(401);
  }

  next();
};

module.exports = { verifyAdminPermission };
