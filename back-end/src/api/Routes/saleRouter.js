const { Router } = require('express');
const controller = require('../controllers/saleController');

const router = Router();

router.post('/', controller.create);

module.exports = router;
