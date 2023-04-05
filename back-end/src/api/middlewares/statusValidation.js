const statusValidation = (req, res, next) => {
  const { status } = req.body;
  const validStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

  if (validStatus.includes(status)) {
    return next();
  }
  return res.sendStatus(400);
};

module.exports = statusValidation;