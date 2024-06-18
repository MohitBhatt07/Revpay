const accountService = require('../services/accountService');

const createAccount = async (req, res) => {
  try {
    const { businessId, bankAccountNumber, sortCode } = req.body;
    const account = await accountService.createAccount(businessId, bankAccountNumber, sortCode);
    res.status(201).json({ message: 'Account created successfully', accountId: account.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAccountStatus = async (req, res) => {
  try {
    const { accountId, status } = req.body;
    const account = await accountService.updateAccountStatus(accountId, status);
    res.status(200).json({ message: 'Account status updated', account });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTransactionTypes = async (req, res) => {
  try {
    const { accountId, creditAllowed, debitAllowed } = req.body;
    const account = await accountService.updateTransactionTypes(accountId, creditAllowed, debitAllowed);
    res.status(200).json({ message: 'Transaction types updated', account });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const setDailyWithdrawalLimit = async (req, res) => {
  try {
    const { accountId, limit } = req.body;
    const account = await accountService.setDailyWithdrawalLimit(accountId, limit);
    res.status(200).json({ message: 'Daily withdrawal limit set', account });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAccountBalance = async (req, res) => {
  try {
    const { accountId } = req.params;
    const balance = await accountService.getAccountBalance(accountId);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAccount,
  updateAccountStatus,
  updateTransactionTypes,
  setDailyWithdrawalLimit,
  getAccountBalance,
};