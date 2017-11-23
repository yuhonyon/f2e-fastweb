import {cloneDeep} from 'lodash';
export const project = state => state.project;
export const curProject = state => state.curProject;
export const packageList = state => state.packageList;

export const compileProject = state => {
  if(state.route.name==="Project"){
    return state.curProject;
  }else{
    return state.project;
  }
};

export const editingPackage = state => {
  let packageList=cloneDeep(state.packageList);
  if(state.project.packageList){
    for(let i in state.project.packageList){
      let name=state.project.packageList[i].name;
      let pageageIndex=packageList.findIndex(val => (val.name===name));
      if(pageageIndex>=0){
        packageList[pageageIndex].selected=true;
        packageList[pageageIndex].version=state.project.packageList[i].version;
      }
    }
  }
  return packageList;
};
