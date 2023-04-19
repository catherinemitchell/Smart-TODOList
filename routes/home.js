const express = require("express");
const router = express.Router();
const categoryQueries = require("../db/queries/categories");
const { getTasks, getTaskByTitle } = require("../db/queries/tasks");
const { addTasks } = require("../db/queries/helper.js");
const {
  categorizeTask,
  categorizeTasksByAPI,
} = require("../public/scripts/categorizeTask.js");


//populate the homepage with categories from the db
router.get("/", (req, res) => {
  categoryQueries.getCategoryList().then(categories => {
    res.render("home", { categories });
  });
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
    if (cat_id) {
      addTasks('1', cat_id, task.priority, task.title, task.task_due);
      res.redirect(`/home`);
      return;
    }
    if (!cat_id) {
      //  categorize with the help of API
      categorizeTasksByAPI(title).then(result => {

        const keywords = {
          1: ["televisionprogram", "movie"],
          2: ["restaurant"],
          3: ["book", "novel"],
          4: ["retaillocation", "financial"],
          5: ["expandedfood", "plant"],
        };

        if (result.success) {
          const datatypes = result.datatypes.split(',');
          datatypes.forEach((datatype) => {
            for (const value in keywords) {
              if (keywords[value].some((k) =>
                k.toLowerCase() === datatype.toLowerCase())) {
                cat_id = value;
              }
            }
          });
        }

        //if api result is unsuccessful, assign to unsorted
        if (cat_id === null) {
          cat_id = 6;
        }
        addTasks('1', cat_id, task.priority, task.title, task.task_due);
        res.redirect(`/home`);
      })
    }
  } else {
    addTasks('1', cat_id, task.priority, task.title, task.task_due);
    res.redirect(`/home`);
  }
});

module.exports = router;
