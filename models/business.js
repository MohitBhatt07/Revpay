const { query } = require('../config/database');

const createBusiness = (username, password) => {
  
  return query('INSERT INTO businesses (username, password) VALUES ($1, $2) RETURNING id', [username, password]);
}
const findBusinessByUsername = (username) => 
  query('SELECT * FROM businesses WHERE username = $1', [username]);

module.exports = {
  createBusiness,
  findBusinessByUsername,
};