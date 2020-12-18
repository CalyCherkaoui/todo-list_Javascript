import './style.css';
import projectNav from './projectNav';
import taskNav from './taskNav';
const Project = require('./project').default;
const Task = require('./task').default;

const globalContainer = document.querySelector('#container');

// apped globalContainer with projectnav & taskNav

let prj1 = new Project('Project1', 1);
let prj2 = new Project('tle2', 2);


const prjList = [prj1, prj2];

let task1 = new Task('my task', 'dddddd', '12', 'low');
let task2 = new Task('my task2', 'dddddd', '12', 'low');

prj1.addTask(task1);
prj1.addTask(task2);

// console.log(prj1);
// console.log(prjList);

// console.log(typeof projectNav);
// console.log(projectNav(prjList));
globalContainer.append(projectNav(prjList), taskNav(prj1));
