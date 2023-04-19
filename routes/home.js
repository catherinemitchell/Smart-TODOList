const express = require("express");
const router = express.Router();
const { getTasks, getTaskByTitle } = require("../db/queries/tasks");
const addTasks = require("../db/queries/addtasks.js");
const {
  categorizeTask,
  categorizeTasksByAPI,
} = require("../public/scripts/categorizeTask.js");

const data = [
  { id: 1, text: "Hello There" },
  { id: 2, text: "Hello Ang" },
];

router.get("/", (req, res) => {
  //console.log("got home");
  res.render("home");
});

/* router.get('/new', (req, res) => {
  console.log('got home');
  res.send({data});
}); */

router.post("/", (req, res) => {
  //console.log("HELLO HOME!");
  res.render("home");
});

// Add new task
router.post("/new-task", (req, res) => {
  const task = req.body;
  //check if the category id is given else call categorize
  let cat_id = task.cat_id;
  const title = task.title;

  // categorize the task if cat_id is not provided
  if (!cat_id) {
    cat_id = categorizeTask(title);
    if (cat_id === null) {
      //  categorize with the help of API
      cat_id = categorizeTasksByAPI(title);
      //set the category id to Unsorted in DB and "miscellaneous" front end
      if (cat_id === null) {
        cat_id = 6;
      }
    }
  }

  //Insert the record into the DB
  addTasks(task.user_id, cat_id, task.priority, task.title, task.task_due);
  res.redirect(`/home`);
});

module.exports = router;
