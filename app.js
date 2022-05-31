const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: false,
    body:
      'Add a task description.\r\n',
    title: 'Add a task title',
  },
];

(function(arrOfTasks) {
  const objOfTasks = tasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {})

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      '--body-background-color': '#fff',
      '--body-background-color': '#fff',
      '--card-background-color': '#fff',
      '--list-group-item-color': '#fff',
    },
    dark: {
      '--base-text-color': '#fff',
      '--header-bg': '#495057',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--light-btn--bg': '#495057',
      '--light-btn-text-color': '#fff',
      '--light-btn-border-color': '#495057',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#ced4da',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--body-background-color': '#343a40',
      '--card-background-color': '#495057',
      '--list-group-item-color': '#495057',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--body-background-color': '#fff',
      '--body-background-color': '#fff',
      '--card-background-color': '#fff',
      '--list-group-item-color': '#fff',
    },
  };
  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';

// DOM elements
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');


// Events
  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  filteredTasksButtons(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onComplitedHandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);
  completeSort(objOfTasks);

  function renderAllTasks(taskslist) {
    // if we haven`t any task in tasklist
    if(tasks.length == 0) {
      const emptyLi = createEmptyTasklist();
      listContainer.appendChild(emptyLi);
    }
    if(!taskslist) {
      console.error('Передайте список задач!');
    }

    const fragment = document.createDocumentFragment();
    Object.values(taskslist).forEach(task => {
      const li = listItemTemplate(task);
      liCompletedCheck(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  //Empty Tasklist Massage
  function createEmptyTasklist() {
    const li = document.createElement('li');
    li.classList.add(
      'empty-tasklist',
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
      'mx-auto',
    );
    const span = document.createElement('span');

    span.textContent = 'Your task list is empty. Please add a new task!';
    span.style.fontWeight = 'bold';

    li.appendChild(span);
    return li;
  }

  function liCompletedCheck({completed, _id}) {
    if(completed === true) {
      const completedTasks = _id;
      console.log(`Завершенные задачи - ${_id}`)
    } else {
      const incompletedTasks = _id;
      console.log(`Незавершенные задачи - ${_id}`)
    }

    const currentTasks = listContainer.children;
    [...currentTasks].forEach(taskElement => {
      const taskId = taskElement.dataset.taskId;
      if(taskId === incompletedTasks) {
        taskElement.classList.add('incompleted-task');
      } else {
        taskElement.classList.add('completed-task');
      }
    });

  }

  //Create task DOM-elements
  function listItemTemplate({_id, title, body} = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add(
      'btn',
      'btn-danger',
      'ml-auto',
      'delete-btn',
    );
    deleteButton.textContent = 'Delete task';

    const completeButton = document.createElement('button');
    completeButton.classList.add(
      'btn',
      'mx-auto',
      'btn-success',
      'complete-btn'
    );
    completeButton.textContent = 'Task complete';

    const article = document.createElement('p');
    article.classList.add(
      'mt-2',
      'w-100',
    );
    article.textContent = body;

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(article);
    li.appendChild(completeButton);
    return li;
  }

  function onFormSubmitHandler(e) {
    const emptyTask = document.querySelector('.empty-tasklist' );

    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if(!titleValue || !bodyValue) {
      return alert('Пожалуйста, введите title и body');
    }
    if(emptyTask) {
      emptyTask.remove();
    }

    newTask = createNewTask(titleValue, bodyValue);
    listItem = listItemTemplate(newTask);

    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    let createID = () =>  Math.floor(Math.random() * 100000000) + 1;

    const newTask = {
      completed: false,
      _id:  `task-${createID()}`,
      body,
      title,
    };


    objOfTasks[newTask._id] = newTask;
    return {...newTask};
  }



// DELETE section
//  Delete function
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Вы точно хотите удалить задачу ${title}`);


    if(!isConfirm) return isConfirm;
    delete objOfTasks[id];
    //if we are delete last tasks
    if(Object.keys(objOfTasks).length === 0) {
      const emptyLi = createEmptyTasklist();
      return listContainer.appendChild(emptyLi);
    }
    return isConfirm;
  }

  function deleteTaskFromHTML(confirm, el) {
    if(!confirm) return;
    el.remove();
  }

//  Header DELETE function - confirmation check, and send to delete function
  function onDeleteHandler({ target }) {
    if(target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent)
    }
  }

// COMPLETE section
//completion confirmation and color change
  function confirmCompleteTask(id, parent) {
    const { title } = objOfTasks[id];
    const completedInfo = objOfTasks[id];
    const isConfirmComplete = confirm(`Пометить задачу ${title}, как выполненную?`);

    if(!isConfirmComplete) return isConfirmComplete;

    parent.style.setProperty('background-color', '#b2b2b2', 'important');
    parent.style.setProperty('color', 'white', 'important');

    const completedTasks = document.getElementsByClassName('d-none');

    if (completedTasks.length !== 0) {
      parent.classList.remove('d-flex');
      parent.classList.add('d-none');
    }

    completedInfo['completed'] = true;

  }
//  Header COMPLETED function
  function onComplitedHandler({ target })  {
    if(target.classList.contains('complete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      confirmCompleteTask(id, parent);
    }
  }

//COPMLETED tasks & INCOMPLETED tasks
//verify with DOM elements
  function CompareCurrentTaskHide(id) {
    const currentTasks = listContainer.children;
    [...currentTasks].forEach(taskElement => {
      const taskId = taskElement.dataset.taskId;
      if(taskId === id) {
        taskElement.classList.remove('d-flex');
        taskElement.classList.add('d-none');
      }
    });
  }

  function CompareCurrentTaskShow(id) {
    const currentTasks = listContainer.children;
    [...currentTasks].forEach(taskElement => {
      const taskId = taskElement.dataset.taskId;
      if(taskId === id) {
        taskElement.classList.remove('d-none');
        taskElement.classList.add('d-flex');
      }
    });
  }

//take id from Array and verify with DOM elements
  function incompletedTasksHandler({ target }) {
      const objVal = Object.values(objOfTasks);
      objVal.forEach(task => {
        const id = task._id;
        if(task.completed === true) {
          CompareCurrentTaskHide(id);
        } else if (task.completed === false) {
          CompareCurrentTaskShow(id)
        }
      });

  }
  function completedTasksHandler({ target }) {

      const objVal = Object.values(objOfTasks);

      objVal.forEach(task => {
        const id = task._id;
        if(task.completed === false) {
          CompareCurrentTaskHide(id);
        } else if (task.completed === true) {
          CompareCurrentTaskShow(id)
        }
      });
  }

function AllTasksHandler({ target }) {
    const completedTasks = document.getElementsByClassName('d-none');
    [...completedTasks].forEach(taskElement => {
      taskElement.classList.remove('d-none');
      taskElement.classList.add('d-flex');
    });
}

//create two buttons
  function filteredTasksButtons() {
    const parentListContainer = listContainer.parentNode;
    const row = document.createElement('row');

    const filterButtonsDiv = document.createElement('div');
    filterButtonsDiv.classList.add('filterButtonsDiv');

    const filterAllTasksButton = document.createElement('button');
    filterAllTasksButton.classList.add('btn', 'btn-light', 'all-tasks-btn',);
    filterAllTasksButton.textContent = 'All tasks';

    const filterIncompletedTasksButton = document.createElement('button');
    filterIncompletedTasksButton.classList.add('btn', 'btn-light', 'incompleted-tasks-btn');
    filterIncompletedTasksButton.textContent = 'Incompleted tasks';

    const filterCompletedTasksButton = document.createElement('button');
    filterCompletedTasksButton.classList.add('btn', 'btn-light', 'completed-tasks-btn');
    filterCompletedTasksButton.textContent = 'Completed tasks';

    parentListContainer.insertBefore(row, listContainer);
    row.appendChild(filterButtonsDiv);
    filterButtonsDiv.appendChild(filterAllTasksButton);
    filterButtonsDiv.appendChild(filterIncompletedTasksButton);
    filterButtonsDiv.appendChild(filterCompletedTasksButton);

    filterAllTasksButton.addEventListener('click', AllTasksHandler);
    filterIncompletedTasksButton.addEventListener('click', incompletedTasksHandler);
    filterCompletedTasksButton.addEventListener('click', completedTasksHandler);
  }

  function completeSort(objOfTasks) {
    const currentTasks = listContainer.children;
    [...currentTasks].forEach(taskElement => {
      const taskId = taskElement.dataset.taskId;

      if(taskElement.classList.contains('complete-btn')) {
        const parent = target.closest('[data-task-id]');
        const id = parent.dataset.taskId;
        confirmCompleteTask(id, parent);
      }
    });
  }

//THEME SELECT section
  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(`Вы действительно хотите сменить тему ${selectedTheme}?`);

    if(!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', lastSelectedTheme);
  }

  function setTheme(name) {
    const selectedThemObj = themes[name];
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);
