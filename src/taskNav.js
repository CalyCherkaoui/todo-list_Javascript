import addTaskIcon from "./add.png";
import { cancelAddTask , addTask, deleteTask, cancelEditTask , submitEditTask} from "./listners";
import editTaskIcon from "./pencil.png";
import deleteTaskIcon  from "./cancel.png";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const displayTask = (task)=>{
  const taskCard = document.createElement('div');
  taskCard.setAttribute('class', 'task_card');
  taskCard.setAttribute('id', `task_card_${task.projId}_${task.id}`);

  // displaying the task mode
  const divShowMode = document.createElement('div');
  divShowMode.setAttribute('id', `task_show_mode_${task.projId}_${task.id}`);
  divShowMode.classList.add('show_div_task');

  const divShowModeLeft = document.createElement('div');
  divShowModeLeft.setAttribute('class', 'div_show_mode_left');
  const priorityBox = document.createElement('div');
  priorityBox.setAttribute('id', `display_task_priority_${task.projId}_${task.id}`);
  priorityBox.classList.add(`priority_box_${task.priority}`, "priority_box");
  const taskTitle = document.createElement('h3');
  taskTitle.setAttribute('id', `display_task_title_${task.projId}_${task.id}`);
  taskTitle.textContent = task.title;
  divShowModeLeft.append(priorityBox, taskTitle);

  const divShowModeRight = document.createElement('div');
  divShowModeRight.setAttribute('class', 'div_show_mode_right');

  const spanDueDate = document.createElement('span');
  spanDueDate.textContent = formatDistanceToNow(task.formatedDueDate(),{addSuffix: true});
  spanDueDate.setAttribute('id', `display_task_date_${task.projId}_${task.id}`);

  const editTaskImage = new Image();
  editTaskImage.setAttribute('src', editTaskIcon);
  editTaskImage.setAttribute('class', 'add_proj_icon');
  editTaskImage.dataset.TaskId = task.id;
  editTaskImage.dataset.TaskProjId = task.projId;
  editTaskImage.addEventListener('click', e => cancelEditTask(e));

  const deleteTaskImage = new Image();
  deleteTaskImage.setAttribute('src', deleteTaskIcon);
  deleteTaskImage.setAttribute('class', 'add_proj_icon');
  deleteTaskImage.dataset.TaskId = task.id;
  deleteTaskImage.dataset.TaskProjId = task.projId;
  deleteTaskImage.addEventListener('click', e => deleteTask(e));

  divShowModeRight.append(spanDueDate, editTaskImage, deleteTaskImage);

  const divShowModeTop = document.createElement('div');
  divShowModeTop.setAttribute('class', 'div_show_mode_top');
  divShowModeTop.append(divShowModeLeft, divShowModeRight);
  // description in the buttom

  const divShowModeButtom = document.createElement('div');
  divShowModeButtom.setAttribute('class', 'div_show_mode_buttom');

  const spanDescription = document.createElement('span');
  spanDescription.classList.add('display_task_description');
  spanDescription.setAttribute('id', `display_task_description_${task.projId}_${task.id}`);
  spanDescription.textContent = task.description;

  const spanStatus = document.createElement('span');
  spanStatus.setAttribute('id', `display_task_status_${task.projId}_${task.id}`);
  spanStatus.classList.add('task_status', `task_status_${task.status}`);
  spanStatus.textContent = task.status;

  divShowModeButtom.append(spanDescription, spanStatus);

  // editing the task mode

  const divEditMode = document.createElement('div');
  divEditMode.setAttribute('id', `task_edit_mode_${task.projId}_${task.id}`);
  divEditMode.classList.add('edit_div_task', 'hide');
  // Edit Form
  const editTaskFormWrapper = document.createElement('div');
  editTaskFormWrapper.classList.add('edit_task_form_wrapper');

  const editTaskTitleDiv = document.createElement('div');
  editTaskTitleDiv.classList.add('edit_task_input_container');
  const editTaskTiteLabel = document.createElement('label');
  editTaskTiteLabel.setAttribute('for', `edit_task_title_${task.projId}_${task.id}`);
  editTaskTiteLabel.textContent = 'Task title:';
  const editTaskTitleInput = document.createElement('input');
  editTaskTitleInput.setAttribute('type', 'text');
  editTaskTitleInput.setAttribute('id', `edit_task_title_${task.projId}_${task.id}`);
  editTaskTitleInput.setAttribute('value', task.title);

  editTaskTitleDiv.append(editTaskTiteLabel, editTaskTitleInput);

  const editTaskDescriptionDiv = document.createElement('div');
  editTaskDescriptionDiv.classList.add('edit_task_input_container');
  const editTaskDescriptionLabel = document.createElement('label');
  editTaskDescriptionLabel.setAttribute('for', `edit_task_description_${task.projId}_${task.id}`);
  editTaskDescriptionLabel.textContent = 'Task Description:';
  const editTaskDescriptionInput = document.createElement('input');
  editTaskDescriptionInput.setAttribute('type', 'text');
  editTaskDescriptionInput.setAttribute('id', `edit_task_description_${task.projId}_${task.id}`);
  editTaskDescriptionInput.setAttribute('value', task.description);

  editTaskDescriptionDiv.append(editTaskDescriptionLabel, editTaskDescriptionInput);

  const editPrioritySpan = document.createElement('span');
  editPrioritySpan.setAttribute('class', 'edit_task_select_span');
  const editPriorityLabel = document.createElement('label');
  editPriorityLabel.textContent = 'Priority:'
  editPriorityLabel.setAttribute('for', `edit_task_priority_${task.projId}_${task.id}`);
  const editPrioritySelect = document.createElement('select');
  editPrioritySelect.setAttribute('id', `edit_task_priority_${task.projId}_${task.id}`);
  const editPriorityOption1 = document.createElement('option');
  editPriorityOption1.setAttribute('value', 'hight');
  editPriorityOption1.textContent = 'Hight';
  const editPriorityOption2 = document.createElement('option');
  editPriorityOption2.setAttribute('value', 'medium');
  editPriorityOption2.textContent = 'Medium';
  const editPriorityOption3 = document.createElement('option');
  editPriorityOption3.setAttribute('value', 'low');
  editPriorityOption3.textContent = 'Low';
  
  editPrioritySelect.append(editPriorityOption1, editPriorityOption2, editPriorityOption3);
  editPrioritySelect.value = task.priority;
  editPrioritySpan.append(editPriorityLabel, editPrioritySelect);


  const editStatusSpan = document.createElement('span');
  editStatusSpan.setAttribute('class', 'edit_task_select_span');
  const editStatusLabel = document.createElement('label');
  editStatusLabel.textContent = 'Status:'
  editStatusLabel.setAttribute('for', `edit_task_status_${task.projId}_${task.id}`);
  const editStatusSelect = document.createElement('select');
  editStatusSelect.setAttribute('id', `edit_task_status_${task.projId}_${task.id}`);
  const editStatusOption1 = document.createElement('option');
  editStatusOption1.setAttribute('value', 'To-do');
  editStatusOption1.textContent = 'To-do';
  const editStatusOption2 = document.createElement('option');
  editStatusOption2.setAttribute('value', 'In-progress');
  editStatusOption2.textContent = 'In progress';
  const editStatusOption3 = document.createElement('option');
  editStatusOption3.setAttribute('value', 'Done');
  editStatusOption3.textContent = 'Done';
  
  editStatusSelect.append(editStatusOption1, editStatusOption2, editStatusOption3);
  editStatusSelect.value = task.status;
  editStatusSpan.append(editStatusLabel, editStatusSelect);

  const editDateSpan = document.createElement('span');
  editDateSpan.setAttribute('class', 'edit_task_select_span');
  const editDateLabel = document.createElement('label');
  editDateLabel.textContent = 'Schedule:'
  editDateLabel.setAttribute('for', `edit_task_date_${task.projId}_${task.id}`);
  const editDateInput = document.createElement('input');
  editDateInput.setAttribute('type', 'date');
  editDateInput.setAttribute('id', `edit_task_date_${task.projId}_${task.id}`);
  editDateSpan.append(editDateLabel, editDateInput);

  const editTaskFormButtons = document.createElement('div');
  editTaskFormButtons.setAttribute('class', 'edit_task_form_buttons');
  const editTaskFormSubmit = document.createElement('button');
  editTaskFormSubmit.classList.add('submit_btn');
  editTaskFormSubmit.dataset.TaskId = task.id;
  editTaskFormSubmit.dataset.TaskProjId = task.projId;
  editTaskFormSubmit.addEventListener('click', (e) => submitEditTask(e));
  editTaskFormSubmit.textContent = 'Submit';

  const editTaskFormCancel = document.createElement('button');
  editTaskFormCancel.classList.add('cancel_btn');
  editTaskFormCancel.textContent = 'Cancel';
  editTaskFormCancel.dataset.TaskId = task.id;
  editTaskFormCancel.dataset.TaskProjId = task.projId;


  editTaskFormCancel.addEventListener('click',  e => cancelEditTask(e));

  editTaskFormButtons.append(editTaskFormSubmit , editTaskFormCancel);

  editTaskFormWrapper.append(editTaskTitleDiv, editTaskDescriptionDiv, editPrioritySpan, editStatusSpan, editDateSpan, editTaskFormButtons);

  //============================================
  divEditMode.append(editTaskFormWrapper);

  divShowMode.append(divShowModeTop, divShowModeButtom);
  taskCard.append(divShowMode, divEditMode);

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
  headerTitle.setAttribute('id', `header_title_${myproject.id}`);
  headerTitle.textContent = myproject.title;


  // add task header
  
  const headerAddTask = document.createElement('button');
  headerAddTask.dataset.projectId = myproject.id;
  headerAddTask.addEventListener('click', e => cancelAddTask(e));

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

  const addTaskFormButtons = document.createElement('div');
  addTaskFormButtons.setAttribute('class', 'add_task_form_buttons');
  const addTaskFormCreate = document.createElement('button');
  addTaskFormCreate.dataset.projectId = myproject.id;
  addTaskFormCreate.addEventListener('click', (e) => addTask(e));
  addTaskFormCreate.textContent = 'Create Task';

  const addTaskFormCancel = document.createElement('button');
  addTaskFormCancel.textContent = 'Cancel';
  addTaskFormCancel.dataset.projectId = myproject.id;
  addTaskFormCancel.addEventListener('click',  e => cancelAddTask(e));

  addTaskFormButtons.append(addTaskFormCreate , addTaskFormCancel);

  addTaskFormWrapper.append(addTaskTitleInput, addTaskDescriptionInput, addPrioritySpan, addDateSpan, addTaskFormButtons);
  // tasks wrapper
  
  const tasksWrapper = document.createElement('div');
  tasksWrapper.setAttribute('id', `tasks_wrapper_${myproject.id}`);
  tasksWrapper.setAttribute('class', 'tasks_wrapper');

  myproject.tasks.forEach( element => {
    tasksWrapper.append(displayTask(element));
    return tasksWrapper;
  });

  divNavWrap.append(header, addTaskFormWrapper, tasksWrapper);
  return divNavWrap;
}


export {taskNav , displayTask};