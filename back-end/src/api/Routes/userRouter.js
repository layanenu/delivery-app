const { Router } = require('express');
const controller = require('../controllers/userController');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { verifyAdminPermission } = require('../middlewares/verifyAdminPermission');

const router = Router();

router.get('/', controller.getUsers);
router.delete('/delete', tokenValidation, verifyAdminPermission, controller.remove);

module.exports = router;
