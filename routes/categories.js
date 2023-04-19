const express = require("express");
const router = express.Router();
const taskQueries = require('../db/queries/tasks');


// get the category List
router.get("/:cat_id", (req, res) => {
  console.log("category ID: ",req.params.cat_id);
  taskQueries.getTasksWithCategoryName(req.params.cat_id).then(tasks => {
    console.log('TASKS', tasks);
    res.render("categories", {tasks} );
  })
});

// Editing a task
router.post("/task/:task_id", (req, res) => {
  //const newtask = editTask(req.body);
  res.send("categories");
});

router.put("/task/:task_id", (req, res) => {
  //const newtask = editTask(req.body);
  //send the query request to update
  res.send("categories");
});

//Deleting the task
router.post("/task/:task_id", (req, res) => {
  //const newtask = editTask(req.body);
  res.send("categories");
});

//Editing the Task

module.exports = router;
