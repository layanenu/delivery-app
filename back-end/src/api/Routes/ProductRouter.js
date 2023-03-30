const { Router } = require('express');
const controller = require('../controllers/productController');

const router = Router();

router.get('/', controller.getAll);

module.exports = router;