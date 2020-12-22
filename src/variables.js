// import { id } from "date-fns/locale";

const tasksContainer = document.createElement('div');
tasksContainer.setAttribute('id', 'tasks_container');

const projectsList = [];
let countProjects = 0;

const findProject = (array,id)=>{
  let min = 0;
  let max = array.length - 1;
  let i = Math.floor((min + max) / 2);
  let found = false;
  while (min <= max && !found) {
    found = array[i].id === id;
    if (!found) {
      if (array[i].id > id) {
        max = i - 1;
      } else {
        min = i + 1;
      }
      i = Math.floor((min + max) / 2);
    }
  }
  return i;
}

const deleteFromProjectList = (projectsList , id)=>{
  let target = findProject(projectsList, id);
  projectsList.splice(target , 1);
}

const editProjectTitle = (projectsList , id, value)=>{
  let target = findProject(projectsList, id);
  projectsList[target].title = value;
}

const addTaskToProject = (array, id, task)=>{
  let target = findProject(array, id);
  let project = array[target];
  project.addTask(task);
}

export {projectsList, countProjects , deleteFromProjectList, editProjectTitle , tasksContainer, addTaskToProject, findProject};