const Transaction = require('../models/transaction');
const Account = require('../models/account');
const { v4: uuidv4 } = require('uuid');
const { validateAmount } = require('../utils/validators');

const createTransaction = async (accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode) => {
  const accountResult = await Account.getAccountDetails(accountId);
  const account = accountResult.rows[0];
  
  validateAmount(amount);

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

  } else if(type === "DEPOSIT")  {
    
    await Account.updateBalance(accountId, amount);
  }
  else{
    throw new Error("Only DEPOSIT and WITHDRAWAL are allowed");
  }

  const id = uuidv4();
  const result = await Transaction.createTransaction(id,accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode);
  return result.rows[0];
};

module.exports = {
  createTransaction,
};