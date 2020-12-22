class Task{
  constructor(title, description, dueDate, priority){
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority; // hight medium low
    this._status = "todo";// "todo"  ====> "progress" ===> "done"
  }

  get title(){
    return this._title;
  }

  set title(title){
    this._title = title;
  }

  get description(){
    return this._description;
  }

  set description(description){
    this._description = description;
  }

  get dueDate(){
    return this._dueDate;
  }

  set dueDate(dueDate){
    this._dueDate = dueDate;
  }

  get priority(){
    return this._priority;
  }

  set priority(priority){
    this._priority = priority;
  }

  get status(){
    return this._status;
  }

  set status(status){
    this._status = status;
  }
}

export default Task;