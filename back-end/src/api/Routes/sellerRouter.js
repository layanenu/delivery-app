const { Router } = require('express');
const controller = require('../controllers/userController');

const router = Router();

router.get('/', controller.getSellers);

module.exports = router;
