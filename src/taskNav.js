import addTaskIcon from "./add.png";

const displayTask = (task)=>{
  const taskCard = document.createElement('div');
  taskCard.setAttribute('class', 'task_card');
  taskCard.textContent = task.title;
  return taskCard;
}

const taskNav = (myproject) => {
  // wrapper
  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('class', 'tabcontent');
  divNavWrap.setAttribute('id', `proj_${myproject.id}`);

  // const brand = document.createElement('div');
  // brand.setAttribute('class', 'project_title');
  // brand.textContent = myproject.title + 'the id' + myproject.id;

  // project header
  const header = document.createElement('div');
  header.setAttribute('class', 'project_header');
  const headerTitle = document.createElement('h2');
  headerTitle.setAttribute('class', 'header_title');
  headerTitle.textContent = myproject.title;


  // add task header
  
  const headerAddTask = document.createElement('button');
  headerAddTask.setAttribute('class', 'header_add_task');
  const addTaskImage = new Image();
  addTaskImage.setAttribute('src', addTaskIcon);
  addTaskImage.setAttribute('class', 'add_proj_icon');
  const addTaskSpan = document.createElement('span');
  addTaskSpan.setAttribute('class', 'add_task_span');
  addTaskSpan.textContent = 'Add a Task';
  headerAddTask.append(addTaskImage, addTaskSpan);



  header.append(headerTitle, headerAddTask);

  // add task form

  const addTaskFormWrapper = document.createElement('div');
  addTaskFormWrapper.setAttribute('class', 'add_task_form_wrapper');
  addTaskFormWrapper.classList.add('hide');
  addTaskFormWrapper.setAttribute('id', `add_task_form_${myproject.id}`);

  const addTaskTitleInput = document.createElement('input');
  addTaskTitleInput.setAttribute('type', 'text');
  addTaskTitleInput.setAttribute('id', `task_title_${myproject.id}`);
  addTaskTitleInput.setAttribute('placeholder', 'Type your task title here!');

  const addTaskDescriptionInput = document.createElement('input');
  addTaskDescriptionInput.setAttribute('type', 'text');
  addTaskDescriptionInput.setAttribute('id', `task_description_${myproject.id}`);
  addTaskDescriptionInput.setAttribute('placeholder', 'Type a description for your task here!');

  const addPrioritySpan = document.createElement('span');
  addPrioritySpan.setAttribute('class', 'add_task_select_span');
  const addPriorityLabel = document.createElement('label');
  addPriorityLabel.textContent = 'Priority:'
  addPriorityLabel.setAttribute('for', `task_priority_${myproject.id}`);
  const addPrioritySelect = document.createElement('select');
  addPrioritySelect.setAttribute('id', `task_priority_${myproject.id}`);
  const addPriorityOption1 = document.createElement('option');
  addPriorityOption1.setAttribute('value', 'hight');
  addPriorityOption1.textContent = 'Hight';
  const addPriorityOption2 = document.createElement('option');
  addPriorityOption2.setAttribute('value', 'medium');
  addPriorityOption2.textContent = 'Medium';
  const addPriorityOption3 = document.createElement('option');
  addPriorityOption3.setAttribute('value', 'low');
  addPriorityOption3.textContent = 'Low';
  addPrioritySelect.append(addPriorityOption1, addPriorityOption2, addPriorityOption3);
  addPrioritySpan.append(addPriorityLabel, addPrioritySelect);

  const addDateSpan = document.createElement('span');
  addPrioritySpan.setAttribute('class', 'add_task_date_span');
  const addDateLabel = document.createElement('label');
  addDateLabel.textContent = 'Schedule:'
  addDateLabel.setAttribute('for', `task_date_${myproject.id}`);
  const addDateInput = document.createElement('input');
  addDateInput.setAttribute('type', 'date');
  addDateInput.setAttribute('id', `task_date_${myproject.id}`);
  addDateSpan.append(addDateLabel, addDateInput);


  addTaskFormWrapper.append(addTaskTitleInput, addTaskDescriptionInput, addPrioritySpan, addDateSpan);
  // tasks wrapper
  
  const tasksWrapper = document.createElement('div');
  tasksWrapper.setAttribute('class', 'tasks_wrapper');

  myproject.tasks.forEach( element => {
    tasksWrapper.append(displayTask(element));
    return tasksWrapper;
  });

  divNavWrap.append(header, addTaskFormWrapper, tasksWrapper);
  return divNavWrap;
}


export {taskNav};