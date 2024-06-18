const { query } = require('../config/database');

const createTransaction = (accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode) =>
  query('INSERT INTO transactions (account_id, type, amount, beneficiary_account_number, beneficiary_sort_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode]);

const getWithdrawalsForDay = (accountId, date) =>
  query('SELECT SUM(amount) as total FROM transactions WHERE account_id = $1 AND type = \'WITHDRAWAL\' AND DATE(timestamp) = $2',
    [accountId, date]);

module.exports = {
  createTransaction,
  getWithdrawalsForDay,
};