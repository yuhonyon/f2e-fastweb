import types from './type';


const mutations = {
  [types.GET_PROJECT](state,data) {
        state.project=data;
  },
  [types.CHANGE_CUR_PROJECT](state,data) {
        state.curProject=data;
  },
  [types.GET_PACKAGE_LIST](state,data) {
        state.packageList=data;
  },
  [types.DELETE_PROJECT](state) {
      if(state.curProject.name===state.project.name){
        state.project={};
        localStorage.removeItem('project');
      }
      state.curProject={};
  }
};
export default mutations;
