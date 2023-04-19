const express = require('express');
const router = express.Router();
const taskQueries = require('../db/queries/tasks');

//api route for getting tasks by category
router.get('/byCat/:cat_id', (req, res) => {
  taskQueries.getTasksByCategory(req.params.cat_id)
    .then(tasks => {
      res.json({ tasks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//api route for getting tasks title by category
router.get('/title', (req, res) => {
  taskQueries.getTasksByTitle()
    .then(tasks => {
      res.json({ tasks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//api route for getting all tasks titles sorted by category
router.get('/allTasks', (req, res) => {
  taskQueries.getAllTasksSortedByCategory()
    .then(tasks => {
      res.json({ tasks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//api route to get all completed task associated with a category
router.get("/completed/:cat_id", (req, res) => {
  taskQueries.getTasksByCategory(req.params.cat_id,true).then(tasks => {
    res.json({ tasks });
  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });;
});

module.exports = router;
