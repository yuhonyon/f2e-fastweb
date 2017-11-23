import types from "./type";
export const getProject=({commit},project) => {
  if(typeof project==='object'){
    commit(types.GET_PROJECT,project);
    localStorage.setItem('project',JSON.stringify(project));
    return;
  }else if(!project){
    let _project=localStorage.getItem('project');
    if(_project){
      commit(types.GET_PROJECT,JSON.parse(_project));
    }
    return;
  }
  fetchApi.fetchGetProject(project).then(data => {
    localStorage.setItem('project',JSON.stringify(data.project));
    commit(types.GET_PROJECT,data.project);
  });

};

export const changeCurProject=({commit},id) => {
  fetchApi.fetchGetProject(id).then(data => {
    commit(types.CHANGE_CUR_PROJECT,data.project);
  });
};


export const deleteProject=({commit},id) => {
  return new Promise((resolve,reject) => {
    fetchApi.fetchDeleteProject(id).then(data => {
      commit(types.DELETE_PROJECT);
      resolve(data);
    });
  });
};

export const getPackageList=({commit}) => {
  fetchApi.fetchGetAllPackages().then(data => {
    let packages=data.packageList;
    commit(types.GET_PACKAGE_LIST,packages);
  });

};
