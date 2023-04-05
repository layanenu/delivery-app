const { Router } = require('express');
const controller = require('../controllers/registerController');
const {
  validateName,
  validatePassword,
  validateEmail,
} = require('../middlewares/userValidate');
const { roleValidation } = require('../middlewares/roleValidation');

const router = Router();

router.post(
  '/',
  validateName,
  validatePassword,
  validateEmail,
  roleValidation,
  controller.register,
);

module.exports = router;
