import { projectsList, countProjects , deleteFromProjectList} from './variables';
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

export {openTab, addProject, cancelAddProject, deleteProject }