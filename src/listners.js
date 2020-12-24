import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import formatISO from 'date-fns/formatISO';
import {
  projectsList, countProjects, deleteFromProjectList,
  editProjectTitle, addTaskToProject, findProject,
  tasksContainer,
} from './variables';
import addTaskIcon from './add.png';
import submitProjectIcon from './check.png';
import cancelProjectIcon from './close.png';
import editProjectIcon from './pencil.png';
import deleteProjectIcon from './cancel.png';

let projectsCounter = countProjects;

const Project = require('./project').default;
const Task = require('./task').default;


const openTab = (e) => {
  const id = e.target.dataset.projectId;
  const projectDiv = document.querySelector(`#proj_${id}`);
  const shown = document.querySelector('.shown');
  if (shown !== null) {
    shown.classList.toggle('shown');
  }
  projectDiv.classList.toggle('shown');
};


const cancelAddProject = () => {
  const input = document.querySelector('#project_title');
  input.value = '';
  const form = document.querySelector('#add_project_form');
  form.classList.toggle('hide');
};

const deleteProject = (e) => {
  const id = e.target.dataset.projectId;
  const wrapper = document.querySelector(`#project_container_${id}`);
  const tabs = document.querySelector('#tabs');
  tabs.removeChild(wrapper);
  // remove from project list
  deleteFromProjectList(projectsList, id);
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
  const tasksWrapper = document.querySelector('#tasks_container');
  // Display default tab when the actual shown project is removed
  const actProjectShow = document.querySelector(`#proj_${id}`);
  tasksWrapper.removeChild(actProjectShow);
  const shownProj = document.querySelector('.shown');
  if (shownProj === null && projectsList.length > 0) {
    const defaultShownTab = document.querySelector(`#proj_${projectsList[0].id}`);
    defaultShownTab.classList.add('shown');
  }
};

const editProject = (e) => {
  const id = e.target.dataset.projectId;
  const spanShow = document.querySelector(`#project_show_mode_${id}`);
  spanShow.classList.toggle('hide');
  const spanEdit = document.querySelector(`#project_edit_mode_${id}`);
  spanEdit.classList.toggle('hide');
};

const cancelProject = (e) => {
  const id = e.target.dataset.projectId;
  const spanShow = document.querySelector(`#project_show_mode_${id}`);
  spanShow.classList.toggle('hide');
  const spanEdit = document.querySelector(`#project_edit_mode_${id}`);
  spanEdit.classList.toggle('hide');
  const input = document.querySelector(`#edit_project_title_${id}`);
  const btnTxt = document.querySelector(`#show_project_title_${id}`);
  input.value = btnTxt.textContent;
};

const submitEditProject = (e) => {
  const id = e.target.dataset.projectId;
  const input = document.querySelector(`#edit_project_title_${id}`);
  editProjectTitle(projectsList, id, input.value);
  const btnTxt = document.querySelector(`#show_project_title_${id}`);
  btnTxt.textContent = input.value;
  const spanShow = document.querySelector(`#project_show_mode_${id}`);
  spanShow.classList.toggle('hide');
  const spanEdit = document.querySelector(`#project_edit_mode_${id}`);
  spanEdit.classList.toggle('hide');
  const defaultShownTab = document.querySelector(`#header_title_${id}`);
  defaultShownTab.textContent = input.value;
};

const cancelAddTask = (e) => {
  const id = e.target.dataset.projectId;
  const titleInput = document.querySelector(`#task_title_${id}`);
  titleInput.value = '';
  const descriptionInput = document.querySelector(`#task_description_${id}`);
  descriptionInput.value = '';
  const priorityInput = document.querySelector(`#task_priority_${id}`);
  priorityInput.value = 'low';
  const form = document.querySelector(`#add_task_form_${id}`);
  form.classList.toggle('hide');
};


const deleteTask = (e) => {
  const taskId = e.target.dataset.TaskId;
  const projId = e.target.dataset.TaskProjId;

  const TaskCard = document.querySelector(`#task_card_${projId}_${taskId}`);
  const tasksWrapper = document.querySelector(`#tasks_wrapper_${projId}`);
  tasksWrapper.removeChild(TaskCard);


  // remove from project list
  const projectIndx = findProject(projectsList, projId);
  const project = projectsList[projectIndx];
  project.removeTask(taskId);

  localStorage.setItem('projectsList', JSON.stringify(projectsList));
};

const cancelEditTask = (e) => {
  const taskId = e.target.dataset.TaskId;
  const projId = e.target.dataset.TaskProjId;

  const projectIndx = findProject(projectsList, projId);
  const project = projectsList[projectIndx];
  const taskIndex = findProject(project.tasks, taskId);
  const task = project.tasks[taskIndex];

  const titleInput = document.querySelector(`#edit_task_title_${projId}_${taskId}`);
  titleInput.value = task.title;
  const descriptionInput = document.querySelector(`#edit_task_description_${projId}_${taskId}`);
  descriptionInput.value = task.description;
  const priorityInput = document.querySelector(`#edit_task_priority_${projId}_${taskId}`);
  priorityInput.value = task.priority;
  const statusInput = document.querySelector(`#edit_task_status_${projId}_${taskId}`);
  statusInput.value = task.status;

  const divShowMode = document.querySelector(`#task_show_mode_${projId}_${taskId}`);
  divShowMode.classList.toggle('hide');
  const divEditMode = document.querySelector(`#task_edit_mode_${projId}_${taskId}`);
  divEditMode.classList.toggle('hide');
};

const submitEditTask = (e) => {
  const taskId = e.target.dataset.TaskId;
  const projId = e.target.dataset.TaskProjId;

  const projectIndx = findProject(projectsList, projId);
  const project = projectsList[projectIndx];
  const taskIndex = findProject(project.tasks, taskId);
  const task = project.tasks[taskIndex];
  const priorityLast = task.priority;
  const statusLast = task.status;

  const titleInput = document.querySelector(`#edit_task_title_${projId}_${taskId}`);
  task.title = titleInput.value;
  const descriptionInput = document.querySelector(`#edit_task_description_${projId}_${taskId}`);
  task.description = descriptionInput.value;
  const priorityInput = document.querySelector(`#edit_task_priority_${projId}_${taskId}`);
  task.priority = priorityInput.value;

  const dateInput = document.querySelector(`#edit_task_date_${projId}_${taskId}`);
  if (dateInput.value !== '') {
    task.dueDate = dateInput.value;
  }

  const statusInput = document.querySelector(`#edit_task_status_${projId}_${taskId}`);
  task.status = statusInput.value;

  const titleDisplay = document.querySelector(`#display_task_title_${projId}_${taskId}`);
  titleDisplay.textContent = task.title;

  const descriptionDisplay = document.querySelector(`#display_task_description_${projId}_${taskId}`);
  descriptionDisplay.textContent = task.description;

  const priorityDisplay = document.querySelector(`#display_task_priority_${projId}_${taskId}`);
  priorityDisplay.classList.remove(`priority_box_${priorityLast}`);
  priorityDisplay.classList.add(`priority_box_${task.priority}`);

  const dateDisplay = document.querySelector(`#display_task_date_${projId}_${taskId}`);
  dateDisplay.textContent = formatDistanceToNow(task.formatedDueDate(), { addSuffix: true });

  const statusDisplay = document.querySelector(`#display_task_status_${projId}_${taskId}`);
  statusDisplay.textContent = task.status;
  statusDisplay.classList.remove(`task_status_${statusLast}`);
  statusDisplay.classList.add(`task_status_${task.status}`);

  const divShowMode = document.querySelector(`#task_show_mode_${projId}_${taskId}`);
  divShowMode.classList.toggle('hide');
  const divEditMode = document.querySelector(`#task_edit_mode_${projId}_${taskId}`);
  divEditMode.classList.toggle('hide');
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
};

const displayTask = (task) => {
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
  priorityBox.classList.add(`priority_box_${task.priority}`, 'priority_box');
  const taskTitle = document.createElement('h3');
  taskTitle.setAttribute('id', `display_task_title_${task.projId}_${task.id}`);
  taskTitle.textContent = task.title;
  divShowModeLeft.append(priorityBox, taskTitle);

  const divShowModeRight = document.createElement('div');
  divShowModeRight.setAttribute('class', 'div_show_mode_right');

  const spanDueDate = document.createElement('span');
  spanDueDate.textContent = formatDistanceToNow(task.formatedDueDate(), { addSuffix: true });
  spanDueDate.setAttribute('id', `display_task_date_${task.projId}_${task.id}`);

  const editTaskImage = new Image();
  editTaskImage.setAttribute('src', editProjectIcon);
  editTaskImage.setAttribute('class', 'add_proj_icon');
  editTaskImage.dataset.TaskId = task.id;
  editTaskImage.dataset.TaskProjId = task.projId;
  editTaskImage.addEventListener('click', e => cancelEditTask(e));

  const deleteTaskImage = new Image();
  deleteTaskImage.setAttribute('src', deleteProjectIcon);
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
  editPriorityLabel.textContent = 'Priority:';
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
  editStatusLabel.textContent = 'Status:';
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
  editDateLabel.textContent = 'Schedule:';
  editDateLabel.setAttribute('for', `edit_task_date_${task.projId}_${task.id}`);
  const editDateInput = document.createElement('input');
  editDateInput.setAttribute('type', 'date');
  editDateInput.setAttribute('id', `edit_task_date_${task.projId}_${task.id}`);
  editDateInput.value = task.dueDate;
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


  editTaskFormCancel.addEventListener('click', e => cancelEditTask(e));

  editTaskFormButtons.append(editTaskFormSubmit, editTaskFormCancel);

  editTaskFormWrapper.append(editTaskTitleDiv, editTaskDescriptionDiv, editPrioritySpan,
    editStatusSpan, editDateSpan, editTaskFormButtons);

  //= ===========================================
  divEditMode.append(editTaskFormWrapper);

  divShowMode.append(divShowModeTop, divShowModeButtom);
  taskCard.append(divShowMode, divEditMode);

  return taskCard;
};

const addTask = (e) => {
  const id = e.target.dataset.projectId;
  const projectIndx = findProject(projectsList, id);
  const project = projectsList[projectIndx];

  const titleInput = document.querySelector(`#task_title_${id}`);
  const title = titleInput.value;
  const descriptionInput = document.querySelector(`#task_description_${id}`);
  const description = descriptionInput.value;
  const priorityInput = document.querySelector(`#task_priority_${id}`);
  const priority = priorityInput.value;

  const dateInput = document.querySelector(`#task_date_${id}`);
  const date = dateInput.value;

  const task = new Task(title, description, date, priority, id, project.taskCounter);
  addTaskToProject(projectsList, id, task);
  const taskWrapper = document.querySelector(`#tasks_wrapper_${id}`);
  taskWrapper.append(displayTask(task));

  const form = document.querySelector(`#add_task_form_${id}`);
  form.classList.toggle('hide');
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
};

const taskNav = (myproject) => {
  // wrapper
  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('class', 'tabcontent');
  divNavWrap.setAttribute('id', `proj_${myproject.id}`);

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

  const addTaskTitleDiv = document.createElement('div');
  addTaskTitleDiv.classList.add('add_task_input_container');
  const addTaskTiteLabel = document.createElement('label');
  addTaskTiteLabel.setAttribute('for', `task_title_${myproject.id}`);
  addTaskTiteLabel.textContent = 'Task title:';

  const addTaskTitleInput = document.createElement('input');
  addTaskTitleInput.setAttribute('type', 'text');
  addTaskTitleInput.setAttribute('id', `task_title_${myproject.id}`);
  addTaskTitleInput.setAttribute('placeholder', 'Type your task title here!');

  addTaskTitleDiv.append(addTaskTiteLabel, addTaskTitleInput);

  const addTaskDescriptionDiv = document.createElement('div');
  addTaskDescriptionDiv.classList.add('add_task_input_container');
  const addTaskDescriptionLabel = document.createElement('label');
  addTaskDescriptionLabel.setAttribute('for', `task_description_${myproject.id}`);
  addTaskDescriptionLabel.textContent = 'Task description:';

  const addTaskDescriptionInput = document.createElement('input');
  addTaskDescriptionInput.setAttribute('type', 'text');
  addTaskDescriptionInput.setAttribute('id', `task_description_${myproject.id}`);
  addTaskDescriptionInput.setAttribute('placeholder', 'Type a description for your task here!');

  addTaskDescriptionDiv.append(addTaskDescriptionLabel, addTaskDescriptionInput);

  const addPrioritySpan = document.createElement('span');
  addPrioritySpan.setAttribute('class', 'add_task_select_span');
  const addPriorityLabel = document.createElement('label');
  addPriorityLabel.textContent = 'Priority:';
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
  addDateLabel.textContent = 'Schedule:';
  addDateLabel.setAttribute('for', `task_date_${myproject.id}`);
  const addDateInput = document.createElement('input');
  addDateInput.setAttribute('type', 'date');
  addDateInput.setAttribute('id', `task_date_${myproject.id}`);
  addDateInput.value = formatISO(new Date(), { representation: 'date' });
  addDateSpan.append(addDateLabel, addDateInput);

  const addTaskFormButtons = document.createElement('div');
  addTaskFormButtons.setAttribute('class', 'add_task_form_buttons');
  const addTaskFormCreate = document.createElement('button');
  addTaskFormCreate.classList.add('submit_btn');
  addTaskFormCreate.dataset.projectId = myproject.id;
  addTaskFormCreate.addEventListener('click', (e) => addTask(e));
  addTaskFormCreate.textContent = 'Create Task';

  const addTaskFormCancel = document.createElement('button');
  addTaskFormCancel.classList.add('cancel_btn');
  addTaskFormCancel.textContent = 'Cancel';
  addTaskFormCancel.dataset.projectId = myproject.id;
  addTaskFormCancel.addEventListener('click', e => cancelAddTask(e));

  addTaskFormButtons.append(addTaskFormCreate, addTaskFormCancel);

  addTaskFormWrapper.append(addTaskTitleDiv, addTaskDescriptionDiv,
    addPrioritySpan, addDateSpan, addTaskFormButtons);

  // tasks wrapper

  const tasksWrapper = document.createElement('div');
  tasksWrapper.setAttribute('id', `tasks_wrapper_${myproject.id}`);
  tasksWrapper.setAttribute('class', 'tasks_wrapper');

  myproject.tasks.forEach(element => {
    tasksWrapper.append(displayTask(element));
    return tasksWrapper;
  });

  divNavWrap.append(header, addTaskFormWrapper, tasksWrapper);
  return divNavWrap;
};

const displayProject = (project) => {
  const wraper = document.createElement('div');
  wraper.setAttribute('id', `project_container_${project.id}`);
  wraper.classList.add('project_container');

  const spanShowMode = document.createElement('span');
  spanShowMode.setAttribute('id', `project_show_mode_${project.id}`);
  spanShowMode.classList.add('span_project');

  const spanEditMode = document.createElement('span');
  spanEditMode.setAttribute('id', `project_edit_mode_${project.id}`);
  spanEditMode.classList.add('span_project', 'hide');

  const btn = document.createElement('button');
  btn.setAttribute('id', `show_project_title_${project.id}`);
  btn.dataset.projectId = project.id;
  btn.addEventListener('click', (e) => openTab(e));
  btn.setAttribute('class', 'tablinks');
  btn.textContent = project.title;

  const editProjectImage = new Image();
  editProjectImage.setAttribute('src', editProjectIcon);
  editProjectImage.setAttribute('class', 'add_proj_icon');
  editProjectImage.dataset.projectId = project.id;
  editProjectImage.addEventListener('click', e => editProject(e));


  const deleteProjectImage = new Image();
  deleteProjectImage.setAttribute('src', deleteProjectIcon);
  deleteProjectImage.setAttribute('class', 'add_proj_icon');
  deleteProjectImage.dataset.projectId = project.id;
  deleteProjectImage.addEventListener('click', e => deleteProject(e));

  const projectShowRightBtns = document.createElement('span');
  projectShowRightBtns.classList.add('project_right_buttons');
  projectShowRightBtns.append(editProjectImage, deleteProjectImage);
  spanShowMode.append(btn, projectShowRightBtns);


  const editProjTitleInput = document.createElement('input');
  editProjTitleInput.setAttribute('type', 'text');
  editProjTitleInput.setAttribute('id', `edit_project_title_${project.id}`);
  editProjTitleInput.setAttribute('value', project.title);


  const submitProjectImage = new Image();
  submitProjectImage.setAttribute('src', submitProjectIcon);
  submitProjectImage.setAttribute('class', 'add_proj_icon');
  submitProjectImage.dataset.projectId = project.id;
  submitProjectImage.addEventListener('click', (e) => submitEditProject(e));

  const cancelProjectImage = new Image();
  cancelProjectImage.setAttribute('src', cancelProjectIcon);
  cancelProjectImage.setAttribute('class', 'add_proj_icon');
  cancelProjectImage.dataset.projectId = project.id;
  cancelProjectImage.addEventListener('click', e => cancelProject(e));

  const projectEditRightBtns = document.createElement('span');
  projectEditRightBtns.classList.add('project_right_buttons');
  projectEditRightBtns.append(submitProjectImage, cancelProjectImage);

  spanEditMode.append(editProjTitleInput, projectEditRightBtns);

  wraper.append(spanShowMode, spanEditMode);

  tasksContainer.append(taskNav(project));

  return wraper;
};

const addProject = () => {
  const input = document.querySelector('#project_title');
  const title = input.value;
  projectsCounter += 1;
  const project = new Project(title, projectsCounter);
  projectsList.push(project);
  localStorage.setItem('countProjects', projectsCounter);
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
  const tabs = document.querySelector('#tabs');
  tabs.append(displayProject(project));
  const actProjectShow = document.querySelector(`#proj_${project.id}`);
  const shown = document.querySelector('.shown');
  if (shown !== null) {
    shown.classList.toggle('shown');
  }
  actProjectShow.classList.add('shown');
  const form = document.querySelector('#add_project_form');
  form.classList.toggle('hide');
};


export { addProject, cancelAddProject, displayProject };