const Transaction = require('../models/transaction');
const Account = require('../models/account');

const createTransaction = async (accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode) => {
  const accountResult = await Account.getAccountBalance(accountId);
  const account = accountResult.rows[0];

  if (!account) {
    throw new Error('Account not found');
  }

  if (account.activation_status === 'INACTIVE') {
    throw new Error('Account is inactive');
  }

  if (type === 'WITHDRAWAL' && !account.debit_allowed) {
    throw new Error('Debit transactions are not allowed for this account');
  }

  if (type === 'DEPOSIT' && !account.credit_allowed) {
    throw new Error('Credit transactions are not allowed for this account');
  }

  if (type === 'WITHDRAWAL') {
    const today = new Date().toISOString().split('T')[0];
    const withdrawalsResult = await Transaction.getWithdrawalsForDay(accountId, today);
    const totalWithdrawnToday = withdrawalsResult.rows[0].total || 0;

    if (parseFloat(totalWithdrawnToday) + parseFloat(amount) > account.daily_withdrawal_limit) {
      throw new Error('Daily withdrawal limit exceeded');
    }

    if (parseFloat(account.balance) < parseFloat(amount)) {
      throw new Error('Insufficient funds');
    }

    await Account.updateBalance(accountId, -amount);
  } else {
    await Account.updateBalance(accountId, amount);
  }

  const result = await Transaction.createTransaction(accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode);
  return result.rows[0];
};

module.exports = {
  createTransaction,
};