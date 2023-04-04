const { Router } = require('express');
const controller = require('../controllers/saleController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const router = Router();

router.post('/', tokenValidation, controller.create);
router.get('/user/:id', controller.getSalesByCustomer);
router.get('/seller/:id', controller.getSalesByCustomer);

module.exports = router;
