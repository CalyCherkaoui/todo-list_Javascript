import { projectsList, countProjects , deleteFromProjectList, editProjectTitle , addTaskToProject, findProject} from './variables';
import { displayProject } from "./projectNav";
import { displayTask } from "./taskNav";
const Project = require('./project').default;
const Task = require('./task').default;

const openTab = (e)=>{
  // console.log(`ayee chez ${e.target.dataset.projectId}`);
  let id = e.target.dataset.projectId;
  let projectDiv = document.querySelector(`#proj_${id}`);
  let shown = document.querySelector('.shown');
  if (shown !== null){
    shown.classList.toggle('shown');
  }
  projectDiv.classList.toggle('shown');
}

const addProject = () => {
  let input = document.querySelector('#project_title');
  let title = input.value;
  countProjects += 1;
  const project = new Project(title, countProjects);
  projectsList.push(project);
  console.log(projectsList);
  let tabs = document.querySelector('#tabs');
  tabs.append( displayProject(project) );

  let form = document.querySelector('#add_project_form');
  form.classList.toggle('hide');
}

const cancelAddProject = () => {
  let input = document.querySelector('#project_title');
  input.value = '';
  let form = document.querySelector('#add_project_form');
  form.classList.toggle('hide');
}

const deleteProject = (e)=>{
  let id = e.target.dataset.projectId;
  let wrapper =  document.querySelector(`#project_container_${id}`);
  let tabs = document.querySelector('#tabs');
  tabs.removeChild(wrapper);
  // remove from project list
  deleteFromProjectList(projectsList,id);
  console.log(`after delete ${projectsList}`);
}

const editProject = (e) => {
  let id = e.target.dataset.projectId;
  const spanShow = document.querySelector(`#project_show_mode_${id}`);
  spanShow.classList.toggle('hide');
  const spanEdit = document.querySelector(`#project_edit_mode_${id}`);
  spanEdit.classList.toggle('hide');
}

const cancelProject = (e) => {
  let id = e.target.dataset.projectId;
  const spanShow = document.querySelector(`#project_show_mode_${id}`);
  spanShow.classList.toggle('hide');
  const spanEdit = document.querySelector(`#project_edit_mode_${id}`);
  spanEdit.classList.toggle('hide');
  const input = document.querySelector(`#edit_project_title_${id}`);
  const btnTxt = document.querySelector(`#show_project_title_${id}`);
  input.value = btnTxt.textContent;
}

const submitEditProject = (e) => {
  let id = e.target.dataset.projectId;
  const input = document.querySelector(`#edit_project_title_${id}`);
  editProjectTitle(projectsList, id, input.value);
  const btnTxt = document.querySelector(`#show_project_title_${id}`);
  btnTxt.textContent = input.value;
  const spanShow = document.querySelector(`#project_show_mode_${id}`);
  spanShow.classList.toggle('hide');
  const spanEdit = document.querySelector(`#project_edit_mode_${id}`);
  spanEdit.classList.toggle('hide');
}

const cancelAddTask = (e) => {
  let id = e.target.dataset.projectId;
  let titleInput = document.querySelector(`#task_title_${id}`);
  titleInput.value = '';
  let descriptionInput = document.querySelector(`#task_description_${id}`);
  descriptionInput.value = '';
  let priorityInput = document.querySelector(`#task_priority_${id}`);
  priorityInput.value = 'low';
  let form = document.querySelector(`#add_task_form_${id}`);
  form.classList.toggle('hide');
}

const addTask = (e) => {
  let id = e.target.dataset.projectId;
  let projectIndx = findProject(projectsList, id);
  let project = projectsList[projectIndx];

  let titleInput = document.querySelector(`#task_title_${id}`);
  let title = titleInput.value;
  let descriptionInput = document.querySelector(`#task_description_${id}`);
  let description =  descriptionInput.value;
  let priorityInput = document.querySelector(`#task_priority_${id}`);
  let priority = priorityInput.value;
  const task = new Task(title , description, 911, priority, id, project.taskCounter);
  addTaskToProject(projectsList, id, task);
  // console.log(projectsList);
  let taskWrapper = document.querySelector(`#tasks_wrapper_${id}`);
  taskWrapper.append( displayTask(task) );

  let form = document.querySelector(`#add_task_form_${id}`);
  form.classList.toggle('hide');
}

const deleteTask = (e)=>{
  let taskId = e.target.dataset.TaskId;
  let projId = e.target.dataset.TaskProjId;

  let TaskCard = document.querySelector(`#task_card_${projId}_${taskId}`);
  let tasksWrapper = document.querySelector(`#tasks_wrapper_${projId}`);
  tasksWrapper.removeChild(TaskCard);


  // remove from project list
  let projectIndx = findProject(projectsList, projId);
  let project = projectsList[projectIndx];
  project.removeTask(taskId);

  console.log(`after delete ${project.tasks}`);
}

const cancelEditTask = (e) => {
  let taskId = e.target.dataset.TaskId;
  let projId = e.target.dataset.TaskProjId;

  let projectIndx = findProject(projectsList, projId);
  let project = projectsList[projectIndx];
  let taskIndex = findProject(project.tasks, taskId);
  let task = project.tasks[taskIndex];

  let titleInput = document.querySelector(`#edit_task_title_${projId}_${taskId}`);
  titleInput.value = task.title;
  let descriptionInput = document.querySelector(`#edit_task_description_${projId}_${taskId}`);
  descriptionInput.value = task.description;
  let priorityInput = document.querySelector(`#edit_task_priority_${projId}_${taskId}`);
  priorityInput.value = task.priority;
  let statusInput = document.querySelector(`#edit_task_status_${projId}_${taskId}`);
  statusInput.value = task.status;

  const divShowMode = document.querySelector(`#task_show_mode_${projId}_${taskId}`);
  divShowMode.classList.toggle('hide');
  const divEditMode = document.querySelector(`#task_edit_mode_${projId}_${taskId}`);
  divEditMode.classList.toggle('hide');
}

const submitEditTask = (e)=>{
  let taskId = e.target.dataset.TaskId;
  let projId = e.target.dataset.TaskProjId;

  let projectIndx = findProject(projectsList, projId);
  let project = projectsList[projectIndx];
  let taskIndex = findProject(project.tasks, taskId);
  let task = project.tasks[taskIndex];
  const priorityLast = task.priority;
  const statusLast = task.status;

  let titleInput = document.querySelector(`#edit_task_title_${projId}_${taskId}`);
  task.title = titleInput.value;
  let descriptionInput = document.querySelector(`#edit_task_description_${projId}_${taskId}`);
  task.description = descriptionInput.value;
  let priorityInput = document.querySelector(`#edit_task_priority_${projId}_${taskId}`);
  task.priority = priorityInput.value;

  let statusInput = document.querySelector(`#edit_task_status_${projId}_${taskId}`);
  task.status = statusInput.value;

  const titleDisplay = document.querySelector(`#display_task_title_${projId}_${taskId}`);
  titleDisplay.textContent = task.title;

  const descriptionDisplay = document.querySelector(`#display_task_description_${projId}_${taskId}`);
  descriptionDisplay.textContent = task.description;

  const priorityDisplay = document.querySelector(`#display_task_priority_${projId}_${taskId}`);
  priorityDisplay.classList.remove(`priority_box_${priorityLast}`);
  priorityDisplay.classList.add(`priority_box_${task.priority}`);

  // const dateDisplay = document.querySelector(`#display_task_date_${projId}_${taskId}`);
  // dateDisplay.textContent = task.dueDtate;

  const statusDisplay = document.querySelector(`#display_task_status_${projId}_${taskId}`);
  statusDisplay.textContent = task.status;
  statusDisplay.classList.remove(`task_status_${statusLast}`);
  statusDisplay.classList.add(`task_status_${task.status}`);

  const divShowMode = document.querySelector(`#task_show_mode_${projId}_${taskId}`);
  divShowMode.classList.toggle('hide');
  const divEditMode = document.querySelector(`#task_edit_mode_${projId}_${taskId}`);
  divEditMode.classList.toggle('hide');
}

export {openTab, addProject, cancelAddProject, deleteProject, editProject, cancelProject, submitEditProject , cancelAddTask , addTask, deleteTask, cancelEditTask, submitEditTask}