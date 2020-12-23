import './style.css';
import { projectsList, countProjects , tasksContainer} from './variables';
import {projectNav , displayProject} from './projectNav';
import taskNav from './taskNav';
const Project = require('./project').default;
const Task = require('./task').default;

const globalContainer = document.querySelector('#container');


// apped globalContainer with projectnav & taskNav

// let prj1 = new Project('Project1', 1);
// let prj2 = new Project('Project2', 2);

// countProjects += 2;
// // const prjList = [prj1, prj2];

// let task1 = new Task('my task', 'dddddd', '2020-12-24', 'low', 1, 1);
// let task2 = new Task('my task2', 'dddddd', '2020-12-24', 'low', 1, 2);
// prj1._taskCounter += 2;

// let task3 = new Task('my task3', 'dddddd', '2020-12-24', 'low', 2, 1);
// let task4 = new Task('my task4', 'dddddd', '2020-12-24', 'low', 2, 2);
// prj2._taskCounter += 2;

// prj1.addTask(task1);
// prj1.addTask(task2);

// prj2.addTask(task3);
// prj2.addTask(task4);

// projectsList.push(prj1 , prj2);

// projectsList.push(prj2);

// console.log(prj1);
// console.log(prjList);

// console.log(typeof projectNav);
// console.log(projectNav(prjList));

console.log('index');
globalContainer.append(projectNav(projectsList) , tasksContainer);
