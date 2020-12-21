import { projectsList, countProjects , deleteFromProjectList, editProjectTitle} from './variables';
import { displayProject } from "./projectNav";
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

export {openTab, addProject, cancelAddProject, deleteProject, editProject, cancelProject, submitEditProject}