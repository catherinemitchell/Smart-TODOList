const express = require("express");
const router = express.Router();
const taskQueries = require("../db/queries/tasks");
const { markComplete } = require("../db/queries/helper");

// get the category List
router.get("/:cat_id", (req, res) => {
  console.log("category ID: ", req.params.cat_id);
  taskQueries.getTasksWithCategoryName(req.params.cat_id).then((tasks) => {
    console.log("TASKS", tasks);
    res.render("categories", { tasks });
  });
});

// Editing a task
router.post("/updateTask/:task_id", (req, res) => {
  taskQueries
    .updateTaskTitle(req.params.task_id, req.body.newTitle)
    .then(() => {
      console.log("edited", req.params.task_id);
    });
});

//Mark the task completed
router.post("/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  // DB operation
  markComplete(taskId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});
module.exports = router;
