$(document).ready(function () {
  console.log('BLUE CHEESE –');
});

const updateTask = function (taskID) {
  console.log("updateTask", taskID);
  const currentTask = $(`#${taskID}`);
  let taskTitle = currentTask.find(".title")[0];
  let taskUpdateOptions = currentTask.find(".task-update-options")[0];
  $(taskTitle).toggle();
  $(taskUpdateOptions).toggle();
};


const deleteTask = function(taskID){
  console.log('deleteTask', taskID);
}

const hideTask = function (taskId, categoryId) {
  $.ajax({
    url: `/categories/${taskId}`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ taskId: taskId }),
    success: function (result) {
      // Reload the page to update the task list
      window.location.reload();
    },
    error: function (error) {
      console.error(error);
    },
  });
};

const showCompletedTasks = function (categoryId) {
  console.log('before get', categoryId);
  $.get( `/api/tasks/completed/${categoryId}`).then(data => {
    console.log('PROMISE GET', data.html);
  });
};
