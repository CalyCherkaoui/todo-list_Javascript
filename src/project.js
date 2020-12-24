/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class Project {
  constructor(title, id) {
    this._title = title;
    this._tasks = [];
    this._id = id;
    this._taskCounter = 0;
  }

  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }

  get taskCounter() {
    return this._taskCounter;
  }

  set title(title) {
    this._title = title;
  }

  get tasks() {
    return this._tasks;
  }

  addTask(task) {
    // sort tasks later
    this._tasks.push(task);
    this._taskCounter += 1;
    // task.id = this._taskCounter;
  }

  removeTask(id) {
    // find index of task by id
    this._tasks.splice(id, 1);// id ===> transformer en index
  }
}

export default Project;