const { Router } = require('express');
const controller = require('../controllers/saleController');
const statusValidation = require('../middlewares/statusValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');

const router = Router();

router.post('/', tokenValidation, controller.create);
router.get('/user/:id', controller.getSalesByCustomer);
router.get('/seller/:id', controller.getSalesByCustomer);
router.get('/:id', controller.getSalesWithDetails);
router.put('/status/:id', statusValidation, controller.updateStatus);

module.exports = router;
