const { Router } = require('express');
const controller = require('../controllers/saleController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const router = Router();

router.post('/', tokenValidation, controller.create);

module.exports = router;
