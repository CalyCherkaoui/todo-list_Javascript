/* eslint no-underscore-dangle: ["error", { "allow": ["_title", "_tasks", "_id" , "_taskCounter" ,
 "_description", "_dueDate" , "_status" , "_priority" , "_projId"] }] */
const Project = require('./project').default;
const Task = require('./task').default;

const tasksContainer = document.createElement('div');
tasksContainer.setAttribute('id', 'tasks_container');

const defaultProject = new Project('My Project', 1);
const defaultTask1 = new Task('My first task', 'This is my first task', '2020-12-24', 'low', 1, 0);
const defaultTask2 = new Task('My second task', 'This is my second task', '2021-12-26', 'low', 1, 1);
defaultProject.addTask(defaultTask1);
defaultProject.addTask(defaultTask2);

const projectsListStored = localStorage.getItem('projectsList') ? JSON.parse(localStorage.getItem('projectsList')) : [defaultProject];
const countProjectsStored = localStorage.getItem('countProjects') ? JSON.parse(localStorage.getItem('countProjects')) : 1;

const findProject = (array, id) => {
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
};

const deleteFromProjectList = (projectsList, id) => {
  const target = findProject(projectsList, id);
  projectsList.splice(target, 1);
};

const editProjectTitle = (projectsList, id, value) => {
  const target = findProject(projectsList, id);
  projectsList[target].title = value;
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
};

const addTaskToProject = (array, id, task) => {
  const target = findProject(array, id);
  const project = array[target];
  project.addTask(task);
};

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
};

const readProjectFromStorage = (objJson) => {
  const title = objJson._title;
  const id = objJson._id;
  const tasks = objJson._tasks;

  const project = new Project(title, id);

  for (let i = 0; i < tasks.length; i += 1) {
    const parsedTask = parseJsonToTask(tasks[i]);
    parsedTask.id = i;
    project.addTask(parsedTask);
  }

  return project;
};

const projectsList = projectsListStored.map((elem) => readProjectFromStorage(elem));
const countProjects = parseInt(countProjectsStored, 10);

export {
  projectsList, countProjects, deleteFromProjectList,
  editProjectTitle, tasksContainer, addTaskToProject, findProject,
};