const { query } = require('../config/database');

const createBusiness = (username, password ,id) => {
  
  return query('INSERT INTO businesses (username, password,id) VALUES ($1, $2,$3) RETURNING id', [username, password,id]);
}
const findBusinessByUsername = (username) => 
  query('SELECT * FROM businesses WHERE username = $1', [username]);

module.exports = {
  createBusiness,
  findBusinessByUsername,
};