class Task{
  constructor(title, description, dueDate = '2020-12-24', priority, projId, id){
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority; // hight medium low
    this._status = "To-do";// "todo"  ====> "progress" ===> "done"
    this._projId = projId;
    this._id = id;
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

  
  get projId(){
    return this._projId;
  }

  
  get id(){
    return this._id;
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

  set id(val){
    this._id = val;
  }

  set status(status){
    this._status = status;
  }

  formatedDueDate(){
    let date = new Date(this._dueDate);
    return date;
  }
}

export default Task;