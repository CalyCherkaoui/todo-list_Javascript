const openTab = (e)=>{
  console.log(`ayee chez ${e.target.dataset.projectId}`);
  let id = e.target.dataset.projectId;
  let projectDiv = document.querySelector(`#proj_${id}`);
  let shown = document.querySelector('.shown');
  if (shown !== null){
    shown.classList.toggle('shown');
  }
  projectDiv.classList.toggle('shown');
}

export {openTab}