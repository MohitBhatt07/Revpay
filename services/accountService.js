const { v4: uuidv4 } = require('uuid');
const Account = require('../models/account');

const createAccount = async (businessId, bankAccountNumber, sortCode) => {
  const id = uuidv4();
  const result = await Account.createAccount(businessId, id, bankAccountNumber, sortCode);
  return result.rows[0];
};

const getAccountDetails = async(accountId) =>{

  const result = await Account.getAccountDetails(accountId);
  return result.rows[0];
}

const listAllAccounts = async() =>{
  const result = await Account.listAllAccountDetails();
  return result.rows;
}

const updateAccountStatus = async (accountId, status) => {
  const result = await Account.updateAccountStatus(accountId, status);
  return result.rows[0];
};

const updateTransactionTypes = async (accountId, creditAllowed, debitAllowed) => {
  const result = await Account.updateTransactionTypes(accountId, creditAllowed, debitAllowed);
  return result.rows[0];
};

const setDailyWithdrawalLimit = async (accountId, limit) => {
  const result = await Account.setDailyWithdrawalLimit(accountId, limit);
  return result.rows[0];
};

const getAccountBalance = async (accountId) => {
  const result = await Account.getAccountBalance(accountId);
  return result.rows[0].balance;
};

module.exports = {
  createAccount,
  updateAccountStatus,
  updateTransactionTypes,
  setDailyWithdrawalLimit,
  getAccountBalance,
  getAccountDetails,
  listAllAccounts
};