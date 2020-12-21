import { addProject, openTab, cancelAddProject , deleteProject} from "./listners";
import addProjIcon from "./playlist.png";
import deleteProjectIcon  from "./cancel.png";

const projectNav = (projList) => {

  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('id', 'project_nav');

  const brand = document.createElement('div');
  brand.setAttribute('class', 'logo_project');
  brand.textContent = 'My Projects';

  const addProj = document.createElement('button');
  addProj.setAttribute('id', 'add_project');
  const addProjectImage = new Image();
  addProjectImage.setAttribute('src', addProjIcon);
  addProjectImage.setAttribute('class', 'add_proj_icon');
  const addProjText = document.createElement('span');
  addProjText.textContent = "Projects";
  addProj.append(addProjText, addProjectImage);
  addProj.addEventListener('click', () => cancelAddProject());

  // Add project form

  const addProjForm = document.createElement('div');
  addProjForm.setAttribute('id', 'add_project_form');
  addProjForm.classList.add('hide');
  const addProjTitleInput = document.createElement('input');
  addProjTitleInput.setAttribute('type', 'text');
  addProjTitleInput.setAttribute('id', "project_title");
  addProjTitleInput.setAttribute('placeholder', 'Type your project title here!');
  const addProjectFormButtons = document.createElement('div');
  addProjectFormButtons.setAttribute('class', 'add_project_form_buttons');
  const addProjectFormCreate = document.createElement('button');

  addProjectFormCreate.addEventListener('click', () => addProject());

  addProjectFormCreate.textContent = 'Create Project';
  const addProjectFormCancel = document.createElement('button');
  addProjectFormCancel.textContent = 'Cancel';

  addProjectFormCancel.addEventListener('click', () => cancelAddProject());

  addProjectFormButtons.append(addProjectFormCreate,addProjectFormCancel);
  addProjForm.append(addProjTitleInput, addProjectFormButtons);

  const tabsDiv = document.createElement('div');
  tabsDiv.setAttribute('id', 'tabs');
  
  projList.forEach(element => {
    tabsDiv.append(displayProject(element));
    return tabsDiv;
  });

  divNavWrap.append(brand, addProj, addProjForm , tabsDiv);
  return divNavWrap;
}

const displayProject = (project) =>{
  const wraper = document.createElement('div');
  wraper.setAttribute('id' , `project_container_${project.id}`);
  wraper.classList.add('project_container');
  const btn = document.createElement('button');
  // dataset
  btn.dataset.projectId = project.id;
  btn.addEventListener('click',(e)=> openTab(e));
  btn.setAttribute('class', 'tablinks');
  btn.textContent = project.title;
  
  const deleteProjectImage = new Image();
  deleteProjectImage.setAttribute('src', deleteProjectIcon);
  deleteProjectImage.setAttribute('class', 'add_proj_icon');
  deleteProjectImage.dataset.projectId = project.id;
  deleteProjectImage.addEventListener('click', e=>deleteProject(e));

  wraper.append(btn , deleteProjectImage);
  return wraper;
}

export {projectNav , displayProject};