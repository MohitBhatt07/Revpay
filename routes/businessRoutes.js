const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.post('/register', businessController.registerBusiness);
router.post('/login', businessController.loginBusiness);

module.exports = router;