const Project = require('./project').default;
const Task = require('./task').default;
const tasksContainer = document.createElement('div');
tasksContainer.setAttribute('id', 'tasks_container');

const projectsListStored = localStorage.getItem('projectsList') ? JSON.parse(localStorage.getItem('projectsList')) : [];
const countProjectsStored = localStorage.getItem('countProjects') ? JSON.parse(localStorage.getItem('countProjects')) : 0;

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


const parseJsonToTask = (objJson) => {
  const title = objJson._title;
  const description = objJson._description;
  const dueDate = objJson._dueDate;
  const priority = objJson._priority; // hight medium low
  const status = objJson._status;// "todo"  ====> "progress" ===> "done"
  const projId = objJson._projId;
  const id = objJson._id;

  const task = new Task(title, description, dueDate, priority, projId, id);
  task.status = status;

  return task;
}

const readProjectFromStorage = (objJson) => {
  const title = objJson._title;
  const id = objJson._id;
  const tasks = objJson._tasks;

  const project = new Project(title, id);

  for(let i = 0 ; i < tasks.length; i += 1) {
    let parsedTask = parseJsonToTask(tasks[i]);
    parsedTask.id = i;
    project.addTask(parsedTask);
  }

  return project;
}

const projectsList = projectsListStored.map( (elem) => { return readProjectFromStorage(elem)});
console.log('variable');
const countProjects = parseInt(countProjectsStored);

export {projectsList, countProjects , deleteFromProjectList,
       editProjectTitle , tasksContainer, addTaskToProject, 
       findProject};