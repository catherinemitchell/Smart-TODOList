const express = require('express');
const router  = express.Router();
const taskQueries = require('../db/queries/tasks');

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


module.exports = router;
