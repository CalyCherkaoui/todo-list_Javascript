const taskNav = (myproject) => {

  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('id', 'task_nav');

  const brand = document.createElement('div');
  brand.setAttribute('class', 'project_title');
  brand.textContent = myproject.title;


  const tasksWrapper = document.createElement('div');
  tasksWrapper.setAttribute('class', 'tasks_wrapper');

  myproject.tasks.forEach( element => {
    const taskCard = document.createElement('div');
    taskCard.setAttribute('class', 'task_card');
    taskCard.textContent = element.title;
    tasksWrapper.append(taskCard);
    return tasksWrapper;
  });

  divNavWrap.append(brand, tasksWrapper);
  return divNavWrap;
}

export default taskNav;