const db = require('../connection');

const getTasksByCategory = (category_id, is_completed= false) => {
  return db.query(`SELECT * FROM tasks WHERE cat_id = ${category_id} AND is_completed = ${is_completed};`)
    .then(data => {
      console.log('ALL TASK IN CAT:', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

const getTasksByTitle = () => {
  return db.query('SELECT title FROM tasks WHERE is_completed = false;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

//returns all tasks associated with a category id
const getTasksWithCategoryName = (category_id) => {
  return db.query(`SELECT * FROM tasks JOIN categories ON cat_id = categories.category_id WHERE cat_id = ${category_id} AND is_completed = false ORDER BY created_date DESC;`)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};


//returns a list of all categories with the associated tasks
const getAllTasksSortedByCategory = () => {
  return db.query(`SELECT cat_id as catID, category_name as catName, array_agg(title) as taskTitles
  FROM tasks JOIN categories ON  cat_id = categories.category_id WHERE tasks.is_completed = false GROUP BY cat_id, catName;
  `)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
}
//updates a new task with a new title and its newly sorter category id
const updateTaskTitleAndCatId = (taskID, newTitle, newCatID) => {
  console.log('db query', taskID, newTitle)
  return db.query(`UPDATE tasks SET title = '${newTitle}', cat_id = '${newCatID}'  WHERE task_id = ${taskID} RETURNING *;
  `)
    .then( data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message)
    })
}


module.exports = { getTasksByCategory, getTasksByTitle, getAllTasksSortedByCategory, getTasksWithCategoryName, updateTaskTitleAndCatId };
