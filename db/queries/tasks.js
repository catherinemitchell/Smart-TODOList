const db = require('../connection');

const getTasksByCategory = (category_id) => {
  return db.query(`SELECT * FROM tasks WHERE cat_id = ${category_id} AND is_completed = false;`)
    .then(data => {
      console.log('data:', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

const getTasksByTitle = () => {
  return db.query('SELECT title FROM tasks WHERE is_completed = false;')
    .then(data => {
      console.log('data:', data.rows)

      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

const getTasksWithCategoryName = (category_id) => {
  return db.query(`SELECT * FROM tasks JOIN categories ON cat_id = categories.category_id WHERE cat_id = ${category_id} AND is_completed = false ORDER BY created_date DESC;`)
    .then(data => {
      console.log('tasks with category data:', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};



const getAllTasksSortedByCategory = () => {
  return db.query(`SELECT cat_id as catID, category_name as catName, array_agg(title) as taskTitles
  FROM tasks JOIN categories ON  cat_id = categories.category_id GROUP BY cat_id, catName;
  `)
    .then(data => {
      console.log('sorted by category data:', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
}

module.exports = { getTasksByCategory, getTasksByTitle, getAllTasksSortedByCategory, getTasksWithCategoryName };
