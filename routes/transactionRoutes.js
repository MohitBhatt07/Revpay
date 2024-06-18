const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/create', auth, transactionController.createTransaction);

module.exports = router;