import { addProject, openTab, cancelAddProject , deleteProject, editProject, cancelProject, submitEditProject} from "./listners";
import addProjIcon from "./playlist.png";
import editProjectIcon from "./pencil.png";
import submitProjectIcon from "./check.png";
import cancelProjectIcon from "./close.png";
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

  const spanShowMode = document.createElement('span');
  spanShowMode.setAttribute('id', `project_show_mode_${project.id}`);
  spanShowMode.classList.add('span_project');

  const spanEditMode = document.createElement('span');
  spanEditMode.setAttribute('id', `project_edit_mode_${project.id}`);
  spanEditMode.classList.add('span_project', 'hide');

  const btn = document.createElement('button');
  btn.setAttribute('id', `show_project_title_${project.id}`);
  btn.dataset.projectId = project.id;
  btn.addEventListener('click',(e)=> openTab(e));
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


  spanShowMode.append(btn, editProjectImage, deleteProjectImage);


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

  spanEditMode.append(editProjTitleInput, submitProjectImage, cancelProjectImage);

  wraper.append(spanShowMode, spanEditMode);
  return wraper;
}

export {projectNav , displayProject};