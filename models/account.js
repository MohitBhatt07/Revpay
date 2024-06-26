const { query } = require("../config/database");

const createAccount = (businessId, id, bankAccountNumber, sortCode) =>
  query(
    "INSERT INTO accounts (business_id, id, bank_account_number, sort_code) VALUES ($1, $2, $3, $4) RETURNING *",
    [businessId, id, bankAccountNumber, sortCode]
  );

const updateAccountStatus = (accountId, status) =>
  query(
    "UPDATE accounts SET activation_status = $1 WHERE id = $2 RETURNING *",
    [status, accountId]
  );  

const updateTransactionTypes = (accountId, creditAllowed, debitAllowed) =>
  query(
    "UPDATE accounts SET credit_allowed = $1, debit_allowed = $2 WHERE id = $3 RETURNING *",
    [creditAllowed, debitAllowed, accountId]
  );

const setDailyWithdrawalLimit = (accountId, limit) =>
  query(
    "UPDATE accounts SET daily_withdrawal_limit = $1 WHERE id = $2 RETURNING *",
    [limit, accountId]
  );

const getAccountBalance = (accountId) =>
  query("SELECT balance FROM accounts WHERE id = $1", [accountId]);

const updateBalance = (accountId, amount) =>
  query(
    "UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING balance",
    [amount, accountId]
  );

const getAccountDetails = (accountId) =>
  query("SELECT * from accounts where id = $1 ", [accountId]);

const listAllAccountDetails = () => query("SELECT * from accounts") ;

module.exports = {
  createAccount,
  updateAccountStatus,
  updateTransactionTypes,
  setDailyWithdrawalLimit,
  getAccountBalance,
  updateBalance,
  getAccountDetails,
  listAllAccountDetails
};
