
const validateUsername = (username) => {
  if (typeof username !== 'string' || username.length < 3 || username.length > 30) {
    throw new Error('Username must be a string between 3 and 30 characters');
  }
};

const validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 8) {
    throw new Error('Password must be a string with at least 8 characters');
  }
};

const validateBankAccountNumber = (bankAccountNumber) => {
  if (!/^\d{1,10}$/.test(bankAccountNumber)) {
    throw new Error('Bank account number must be numeric and up to 10 digits');
  }
};

const validateSortCode = (sortCode) => {
  if (!/^\d{1,8}$/.test(sortCode)) {
    throw new Error('Sort code must be numeric and up to 8 digits');
  }
};

const validateActivationStatus = (status) => {
  if (status !== 'ACTIVE' && status !== 'INACTIVE') {
    throw new Error('Activation status must be either ACTIVE or INACTIVE');
  }
};

const validateTransactionType = (type) => {
  if (type !== 'CREDIT' && type !== 'DEBIT') {
    throw new Error('Transaction type must be either CREDIT or DEBIT');
  }
};

const validateAmount = (amount) => {
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number');
  }
};

module.exports = {
  validateUsername,
  validatePassword,
  validateBankAccountNumber,
  validateSortCode,
  validateActivationStatus,
  validateTransactionType,
  validateAmount,
};