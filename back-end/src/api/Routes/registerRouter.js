const { Router } = require('express');
const controller = require('../controllers/registerController');
const {
  validateName,
  validatePassword,
  validateEmail,
} = require('../middlewares/userValidate');
const { roleValidation } = require('../middlewares/roleValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { verifyAdminPermission } = require('../middlewares/verifyAdminPermission');

const router = Router();

router.post(
  '/',
  validateName,
  validatePassword,
  validateEmail,
  roleValidation,
  controller.register,
);
router.post(
  '/admin',
  tokenValidation,
  validateName,
  validatePassword,
  validateEmail,
  roleValidation,
  verifyAdminPermission,
  controller.register,
);

module.exports = router;
