import { openTab } from "./listners";
const projectNav = (projList) => {

  const divNavWrap = document.createElement('div');
  divNavWrap.setAttribute('id', 'project_nav');

  const brand = document.createElement('div');
  brand.setAttribute('class', 'logo_project');
  brand.textContent = 'My Projects';


  const tabsDiv = document.createElement('div');
  tabsDiv.setAttribute('class', 'tabs');

  projList.forEach( element => {
    const btn = document.createElement('button');
    // dataset
    btn.dataset.projectId = element.id;
    btn.addEventListener('click',(e)=> openTab(e));

    btn.setAttribute('class', 'tablinks');
    btn.textContent = element.title;
    tabsDiv.append(btn);
    return tabsDiv;
  });

  divNavWrap.append(brand, tabsDiv);
  return divNavWrap;
}

export default projectNav;