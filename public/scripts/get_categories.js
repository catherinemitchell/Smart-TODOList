//Unused file for now

const { Pool } = require("pg");

const getAllTasks = function () {

const queryString = `
SELECT *
FROM tasks`
;
return pool.query (queryString, values)
.then((result) => {

  return result.row[0]
})
.catch((err) => {
  console.log(err.message)
})
};
const res = getAllTasks()
console.log(res)


// const getTaskByTitle = function (title) {

//   const values = [title]
//   const queryString = `
//   SELECT title
//   FROM tasks`

// return pool.query (queryString, values)
// .then((result) => {
//   console.log('tasks:', result)
//   return result.row[0]
// })
// .catch((err) => {
//   console.log(err.message)
// })
// };

// getTaskByTitle('hi')

