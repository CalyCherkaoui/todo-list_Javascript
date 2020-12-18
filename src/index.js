import './style.css';
const Project = require('./project');
const Task = require('./task');

let project = new Project("qlqchose");
console.log(project.title);

let task = new Task("couscous", "deliscious", "now", 1111);
console.log(`title === ${task.title} description === ${task.description} ans status === ${task.status}`);