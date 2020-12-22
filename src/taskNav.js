import addTaskIcon from "./add.png";

const displayTask = (task)=>{
  const taskCard = document.createElement('div');
  taskCard.setAttribute('class', 'task_card');
  taskCard.textContent = task.title;
  return taskCard;
}

const taskNav = (myproject) => {
  // wrapper
  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('class', 'tabcontent');
  divNavWrap.setAttribute('id', `proj_${myproject.id}`);

  // const brand = document.createElement('div');
  // brand.setAttribute('class', 'project_title');
  // brand.textContent = myproject.title + 'the id' + myproject.id;

  // project header
  const header = document.createElement('div');
  header.setAttribute('class', 'project_header');
  const headerTitle = document.createElement('h2');
  headerTitle.setAttribute('class', 'header_title');
  headerTitle.textContent = myproject.title;


  // add task header
  
  const headerAddTask = document.createElement('button');
  headerAddTask.setAttribute('class', 'header_add_task');
  const addTaskImage = new Image();
  addTaskImage.setAttribute('src', addTaskIcon);
  addTaskImage.setAttribute('class', 'add_proj_icon');
  const addTaskSpan = document.createElement('span');
  addTaskSpan.setAttribute('class', 'add_task_span');
  addTaskSpan.textContent = 'Add a Task';
  headerAddTask.append(addTaskImage, addTaskSpan);

  header.append(headerTitle, headerAddTask);
  
  const tasksWrapper = document.createElement('div');
  tasksWrapper.setAttribute('class', 'tasks_wrapper');

  myproject.tasks.forEach( element => {
    tasksWrapper.append(displayTask(element));
    return tasksWrapper;
  });

  divNavWrap.append(header, tasksWrapper);
  return divNavWrap;
}


export {taskNav};