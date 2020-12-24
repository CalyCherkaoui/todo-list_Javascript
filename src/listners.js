import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  projectsList, countProjects, deleteFromProjectList,
  editProjectTitle, addTaskToProject, findProject,
} from './variables';
import { displayProject } from './projectNav';
import { displayTask } from './taskNav';

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

const addProject = () => {
  const input = document.querySelector('#project_title');
  const title = input.value;
  countProjects += 1;
  const project = new Project(title, countProjects);
  projectsList.push(project);
  localStorage.setItem('countProjects', countProjects);
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
  const tabs = document.querySelector('#tabs');
  tabs.append(displayProject(project));
  const actProjectShow = document.querySelector(`#proj_${project.id}`);
  //= ===
  const shown = document.querySelector('.shown');
  if (shown !== null) {
    shown.classList.toggle('shown');
  }
  actProjectShow.classList.add('shown');
  const form = document.querySelector('#add_project_form');
  form.classList.toggle('hide');
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

export {
  openTab, addProject, cancelAddProject, deleteProject, editProject, cancelProject,
  submitEditProject, cancelAddTask, addTask, deleteTask, cancelEditTask, submitEditTask,
};