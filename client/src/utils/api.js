import Fetch from './fetch';


const fetchApi={
  fetchGetAllPackages(){
    return Fetch.get("/packages",(data) => {
      return data;
    });
  },
  fetchGetProjectList(){
    return Fetch.get("/projects",(data) => {
      return data;
    });
  },
  fetchGetProject(id){
    return Fetch.get("/project/"+id,(data) => {
      return data;
    });
  },
  fetchDeleteProject(id){
    return Fetch.delete("/project/"+id,(data) => {
      return data;
    });
  },
  fetchSaveProject(id,params){
    return Fetch.put("/project/"+id,params,(data) => {
      return data;
    });
  },
  fetchNewProject(params){
    return Fetch.post("/project/",params,(data) => {
      return data;
    });
  },
  fetchGetPackage(params){
    return Fetch.get(`/package`,{params: params},(data) => {
      return data;
    });
  }
};
export default fetchApi;
