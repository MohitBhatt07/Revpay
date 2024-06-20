const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const Business = require('../models/business');

const registerBusiness = async (username, password) => {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await Business.createBusiness(username, hashedPassword ,id);
  return result.rows[0];
};

const authenticateBusiness = async (username, password) => {
  const result = await Business.findBusinessByUsername(username);
  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }
  const business = result.rows[0];
  const isMatch = await bcrypt.compare(password, business.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return business;
};

module.exports = {
  registerBusiness,
  authenticateBusiness,
};