const displayTask = (task)=>{
  const taskCard = document.createElement('div');
  taskCard.setAttribute('class', 'task_card');
  taskCard.textContent = task.title;
  return taskCard;
}

const taskNav = (myproject) => {

  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('class', 'tabcontent');
  divNavWrap.setAttribute('id', `proj_${myproject.id}`);

  const brand = document.createElement('div');
  brand.setAttribute('class', 'project_title');
  brand.textContent = myproject.title + 'the id' + myproject.id;

  
  const tasksWrapper = document.createElement('div');
  tasksWrapper.setAttribute('class', 'tasks_wrapper');

  myproject.tasks.forEach( element => {
    tasksWrapper.append(displayTask(element));
    return tasksWrapper;
  });

  divNavWrap.append(brand, tasksWrapper);
  return divNavWrap;
}


export {taskNav};