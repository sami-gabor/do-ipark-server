const connection = require('./connection.js');


const storeUserData = (email, password) => {
  const results = [
    [email, password],
  ];

  // id, email, password_hash, joined
  connection.query('INSERT INTO users (email, password_hash) VALUES ?', [results], (error) => {
    if (error) throw error;
  });
};


const getUserByEmail = (username, cb) => {
  const query = `SELECT * FROM users`;
  return connection.query(query, cb)[0];
  // const error = null;
  // const user = {
  //   "username": "admin",
	//   "password_hash": "123"
  // }
  // return cb(error, [user]);
};



module.exports = {
  getUserByEmail,
  storeUserData
};
