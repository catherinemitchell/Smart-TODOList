$(document).ready(function() {
  //loadTasks();
  console.log('BLUE CHEESE –');
  console.log( $("section").children('.task-update-options'));
  $('.task-update-options').css("display","none");
});


const loadTasks = function() {
  $.get('/api/tasks/byCat/1', function(data, status) {
    console.log('CAT HOME', data, typeof data);
    renderTasks(data.tasks);
  })
}

const updateTask = function(taskID){
  console.log('updateTask', taskID);
  const currentTask= $(`#${taskID}`);
  let taskTitle = currentTask.find('.title')[0];
  let taskUpdateOptions = currentTask.find('.task-update-options')[0];
  $(taskTitle).toggle();
  $(taskUpdateOptions).toggle();
/*   console.log('task title', taskTitle);
  $(taskTitle).replaceWith(
  `
  <form method="POST" name= 'update-entry' action="">
      <input type="text" id="task" name="title"><br>
      <button type="submit"><i class="fa-solid fa-plus"></i></button>
  </form> `
  ); */

}

const deleteTask = function(taskID){
  console.log('deleteTask', taskID);
}

const completeTask = function(taskID){
  console.log('completeTask', taskID);
}

