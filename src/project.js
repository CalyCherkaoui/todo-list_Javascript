class Project {
  constructor(title){
    this._title = title;
    this._tasks = [];
  }
  get title(){
    return this._title;
  }

  set title(title){
    this._title = title;
  }

  get tasks(){
    return this._tasks;
  }

  addTask(task){
    // sort tasks later
    this._tasks.push(task);
  }

  removeTask(id){
    // find index of task by id
    this._tasks.splice(id,1);//id ===> transformer en index
  }
}

export default Project;