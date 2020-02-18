const connection = require('./connection.js');


const storeUserData = (email, password_hash) => {
  const results = [
    [ email, password_hash ]
  ];
  // id, email, password_hash, joined
  connection.query('INSERT INTO users (email, password_hash) VALUES ?', [results], (error) => {
    if (error) console.log('Erorr on adding the user: ', error);
  });
};


const getUserByEmail = (email, cb) => {
  const query = `SELECT * FROM users WHERE email = "admin"`;
  return connection.query(query, cb)[0];
};



module.exports = {
  getUserByEmail,
  storeUserData
};
