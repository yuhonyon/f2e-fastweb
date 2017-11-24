const fs = require('fs');
const cmd = require('../utils/cmd');
const lodash =require('lodash');
const _fs = require('../utils/fs');
const path=require('path');
const Project={
  saveProject(data){
      data.createTime=new Date().getTime();
      return _fs.writeFile(path.join(__dirname,`../data/project/${data.name||data.changeTime}.json`), JSON.stringify(data, null, 2));
  },
  modifyProject(id,data){
      data.changeTime=new Date().getTime();
      let result=_fs.hasFile(path.join(__dirname,`../data/project/${id}.json`));
      if(result===true){
         let old=JSON.parse(fs.readFileSync(path.join(__dirname,`../data/project/${id}.json`)));
         data=lodash.merge(old,data);
         if(id!==data.name){
           _fs.deleteFile(path.join(__dirname,`../data/project/${id}.json`));
         }

         return _fs.writeFile(path.join(__dirname,`../data/project/${data.name||data.changeTime}.json`),JSON.stringify(data, null, 2));
      }else{
        return result;
      }

  },
  getProject(id){
      return _fs.readFile(path.join(__dirname,`../data/project/${id}.json`));
  },
  getProjectList(){
      return _fs.readdir(path.join(__dirname,`../data/project/`));
  },
  deleteProject(id){
      return _fs.deleteFile(path.join(__dirname,`../data/project/${id}.json`));
  }
};

module.exports=Project;
