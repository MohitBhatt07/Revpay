const transactionService = require('../services/transactionService');

const createTransaction = async (req, res) => {
  try {
    const { accountId, type, amount, beneficiaryAccountNumber, beneficiarySortCode } = req.body;
    const transaction = await transactionService.createTransaction(
      accountId,
      type,
      amount,
      beneficiaryAccountNumber,
      beneficiarySortCode
    );
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
};