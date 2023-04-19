$(document).ready(function() {
  loadCategories();
  console.log('YELLOW CHEESE –');

  $('#category-options-button').on('click', function (e) {
    $('#category-options').toggle()
    $(this).find('i').toggleClass('fa-solid fa-angles-down').toggleClass('fa-solid fa-angles-up');
  });

  $(".cat-option").on('click', function (e) {
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

//render all category container
const renderCategories = function(categories) {
  categories.forEach(element => {
    const categoryHTML = createCategoryBlock(element);
    $('.category-container').append(categoryHTML)
  });
}

//input data: assumes that the object has an array of taskTitles, catid, catname
function createCategoryBlock(data) {
  let elementList = '';
  for( let taskTitle of  data.tasktitles)
  {
    elementList += createTaskElement(taskTitle);
  }
  const element = `
          <article class="category" id = "${data.catid}">
          <h2>${data.catname}</h2>
          ${elementList}
          </article>
          `
  return element;
}
//input data: string-title of the task
function createTaskElement(data) {
  const element =
    `<div class='task-list-element'><i class="icon fa-solid fa-caret-right"></i> <span>${data} </span></div>`;
  return element;
}

//call for rendering data and creating listeners dynamically on the client side
const loadCategories = function() {
  $.get('/api/tasks/allTasks', function(data, status) {
    console.log('HOME', data, typeof data);
    renderCategories(data.tasks);
    generateListeners(data.tasks);
  })
}

//input data: assumes that the object has an array of taskTitles, catid, catname
const generateListeners = function(data) {
  data.forEach(element => {
    $(`#${element.catid}`).click(function(event) {
      console.log('inside element', element.catid);
      window.location.href = `http://localhost:8080/categories/${element.catid}`;

    });
  });

}

