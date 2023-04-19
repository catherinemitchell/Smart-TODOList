const express = require("express");
const router = express.Router();
const taskQueries = require("../db/queries/tasks");
const categoryQueries = require("../db/queries/categories");
const { markComplete } = require("../db/queries/helper");
const { categorizeTask,
  categorizeTasksByAPI } = require("../public/scripts/categorizeTask");

// get the category list and the entries associated with it
router.get("/:cat_id", (req, res) => {
  taskQueries.getTasksWithCategoryName(req.params.cat_id).then((tasks) => {
    categoryQueries.getCategoryList().then((categories) => {
      if (tasks.length > 0) {
        res.render("categories", { tasks, categories });
      } else {
        res.redirect(`/home`);
      }
    }
    )
  });
});

// Editing a task
router.post("/updateTask/:task_id", (req, res) => {
  const newTitle = req.body.newTitle;
  const taskId = req.params.task_id;
  const newCatId = req.body.cat_id;

  console.log(newTitle, taskId, newCatId);

  //categorize if theres a user specified category
  if (newCatId) {
    taskQueries.updateTaskTitleAndCatId(taskId, newTitle, newCatId)
      .then(task => {
        res.redirect(`/categories/${task.cat_id}`);
      });
    return;
  }

  let cat_id = categorizeTask(newTitle);

  if (!cat_id) {
    //  categorize with the help of API
    categorizeTasksByAPI(newTitle).then(result => {
      const keywords = {
        1: ["televisionprogram", "movie"],
        2: ["restaurant", "species"],
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

      if (cat_id === null) {
        cat_id = 6;
      }
      taskQueries.updateTaskTitleAndCatId(taskId, newTitle, cat_id)
        .then(task => {
          res.redirect(`/categories/${task.cat_id}`);
        })
    })

  } else {
    //update db and redirect page to the new category of the last edited item
    taskQueries.updateTaskTitleAndCatId(taskId, newTitle, cat_id)
      .then(task => {
        res.redirect(`/categories/${task.cat_id}`);
      })
  }

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
