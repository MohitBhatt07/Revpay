const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const auth = require('../middleware/auth');

router.post('/create', auth, accountController.createAccount);
router.put('/status', auth, accountController.updateAccountStatus);
router.put('/transaction-types', auth, accountController.updateTransactionTypes);
router.put('/withdrawal-limit', auth, accountController.setDailyWithdrawalLimit);
router.get('/balance/:accountId', auth, accountController.getAccountBalance);

module.exports = router;