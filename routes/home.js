const express = require("express");
const router = express.Router();
const { getTasks, getTaskByTitle } = require("../db/queries/tasks");
const addTasks = require("../db/queries/addtasks.js");

const data = [
  { id: 1, text: "Hello There" },
  { id: 2, text: "Hello Ang" },
];

router.get("/", (req, res) => {
  console.log("got home");
  res.render("home");
});

/* router.get('/new', (req, res) => {
  console.log('got home');
  res.send({data});
}); */

router.post("/", (req, res) => {
  console.log("HELLO HOME!");
  res.render("home");
});
//rename to /new-task
router.post("/new-task", (req, res) => {
  console.log('home new post:', req.body);
 /* if (!req.body.category) {
     internal tool for categorizing.then(() => {
       if (internal tool return nothing) {
        call external tool.then (() => {
          if externaltool returns nothing then put in  miscellaneous category
        })
      }
     })
    }
*/
  addTasks(req.body);
  res.redirect(`/home`);
});

module.exports = router;
