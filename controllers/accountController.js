const accountService = require("../services/accountService");
const { validateBankAccountNumber, validateSortCode, validateActivationStatus, validateBooleans, validateAmount } = require("../utils/validators");

const createAccount = async (req, res) => {
  try {
    const { businessId, bankAccountNumber, sortCode } = req.body;
    validateBankAccountNumber(bankAccountNumber);
    validateSortCode(sortCode);
    const account = await accountService.createAccount(
      businessId,
      bankAccountNumber,
      sortCode
    );
    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    
    res.status(400).json({ message: error.detail });
  }
};

const updateAccountStatus = async (req, res) => {
  try {
    const { accountId, status } = req.body;
    validateActivationStatus(status);
    const account = await accountService.updateAccountStatus(accountId, status);
    res.status(200).json({ message: "Account status updated", account });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTransactionTypes = async (req, res) => {
  try {
    const { accountId, creditAllowed, debitAllowed } = req.body;
    validateBooleans(creditAllowed,debitAllowed);
    const account = await accountService.updateTransactionTypes(
      accountId,
      creditAllowed,
      debitAllowed
    );
    res.status(200).json({ message: "Transaction types updated", account });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const setDailyWithdrawalLimit = async (req, res) => {
  try {
    const { accountId, limit } = req.body;
    validateAmount(limit);
    const account = await accountService.setDailyWithdrawalLimit(
      accountId,
      limit
    );
    res.status(200).json({ message: "Daily withdrawal limit set", account });
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

const getAccountDetails = async (req, res) => {
  try {
    const { id : accountId } = req.params;
    const accountDetails = await accountService.getAccountDetails(accountId);
    res.status(200).json({ message: "Transaction types updated", accountDetails });
  } catch (error) {
    res.status(400).json({message : error.message});
  }
};

const listAllAccounts = async (req, res) => {
  try{
    const accountsList = await accountService.listAllAccounts();
    res.status(200).json({accountsList});
  }
  catch (error) {
    res.status(400).json({message : error.message});
  }
}

module.exports = {
  listAllAccounts,
  createAccount,
  updateAccountStatus,
  updateTransactionTypes,
  setDailyWithdrawalLimit,
  getAccountBalance,
  getAccountDetails
};
