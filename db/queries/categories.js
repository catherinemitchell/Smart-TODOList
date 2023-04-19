const db = require('../connection');

//returns the list of all categories on the db
const getCategoryList = () => {
  return db.query(`SELECT * FROM categories;`)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

module.exports = { getCategoryList };
