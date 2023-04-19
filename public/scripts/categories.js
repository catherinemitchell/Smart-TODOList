$(document).ready(function() {

  $(".cat-option").on('onMouseDown', function(e) {
    console.log('OPTION SELECTED');
    var previousValue = $(this).attr('previousValue');
    if (previousValue == 'true') {
      this.checked = false;
      $(this).attr('previousValue', this.checked);
    }
    else {
      this.checked = true;
      $(this).attr('previousValue', this.checked);
    }
  });
});

const updateTask = function(taskID, currentTitle) {
  console.log("updateTask", taskID);
  const currentTask = $(`#${taskID}`);
  let taskTitle = currentTask.find(".title")[0];
  let taskUpdateOptions = currentTask.find(".task-update-options")[0];
  $(taskTitle).toggle();
  $(taskUpdateOptions).toggle();
  let inputVal=  $(taskUpdateOptions).find('#task')[0];
  console.log(
  );
  $(inputVal).val(`${currentTitle}`);

};

const showCategories = function() {
  let currentBlock = $(this);
  console.log(currentBlock);
  currentBlock.next().css("background-color", "red");
}


const deleteTask = function(taskID) {
  console.log('deleteTask', taskID);
}

const hideTask = function(taskId, categoryId) {
  $.ajax({
    url: `/categories/${taskId}`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ taskId: taskId }),
    success: function(result) {
      // Reload the page to update the task list
      window.location.reload();
    },
    error: function(error) {
      console.error(error);
    },
  });
};

const showCompletedTasks = function(categoryId) {
  console.log('before get', categoryId,);
  $.get(`/api/tasks/completed/${categoryId}`).then(data => {
    $('.category').append(createCompletedElements(data));
    console.log('PROMISE GET', data);
  });

};

const createCompletedElements = function(data) {
  //for (cosy )
  const element = {

  }
  return element;
}
