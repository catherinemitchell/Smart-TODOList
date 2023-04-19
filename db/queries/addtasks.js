const { Pool } = require("pg");
//create a new pool for the database
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

// Add new task to database
const addTasks = function (user_id, cat_id, priority, title, task_due) {
  // Query the database
  const query = `
	INSERT INTO tasks (user_id, cat_id, priority, title, task_due)
  	VALUES ($1, $2, $3, $4, $5)
  	RETURNING *;`;
  const values = [user_id, cat_id, priority, title, task_due];
  return pool
    .query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error("query error", err.stack);
    });
};

module.exports = addTasks;
