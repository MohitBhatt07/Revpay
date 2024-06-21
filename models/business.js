const { query } = require('../config/database');

const createBusiness = async(username, password ,id) => {
  const sameNameUser = await query(`Select username from businesses where username = $1` , [username]);
  if(sameNameUser.rows.length !==0 ){
    throw new Error(`username ${username} already exists try some different name`);
  }
  return query('INSERT INTO businesses (username, password,id) VALUES ($1, $2,$3) RETURNING id', [username, password,id]);
}
const findBusinessByUsername = (username) => 
  query('SELECT * FROM businesses WHERE username = $1', [username]);

module.exports = {
  createBusiness,
  findBusinessByUsername,
};