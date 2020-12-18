import './style.css';
import projectNav from './projectNav';
const Project = require('./project').default;
const Task = require('./task').default;

const globalContainer = document.querySelector('#container');

// apped globalContainer with projectnav & taskNav

let prj1 = new Project('tle');
let prj2 = new Project('tle2');


const prjList = [prj1, prj2];

// console.log(prj1);
// console.log(prjList);

// console.log(typeof projectNav);
// console.log(projectNav(prjList));
globalContainer.append(projectNav(prjList));
