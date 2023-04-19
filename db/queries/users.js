const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//insert a new user in the db
const createUser = () => {
  const query =
    `INSERT INTO users (name, password, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;
  const values = [name, password, email];
  return pool
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error("query error", err.stack);
    });
};

//returns a user in the db
const getUser = (email, password) => {

  //check tiny app
  return db.query(`SELECT * FROM users WHERE email=${email};`)
    .then(data => {
      return data.rows;
    });
};


module.exports = { getUsers, createUser };
