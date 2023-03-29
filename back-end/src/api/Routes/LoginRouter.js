const { Router } = require('express');
const controller = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/loginValidate');

const router = Router();

router.post('/', validateLogin, controller.login);

module.exports = router;