const Project = require('../models/project');
const xss = require('xss');

exports.getProject = async(ctx, next) => {
  ctx.checkParams('id').notEmpty("id不能为空");
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  let id = xss(ctx.params.id.trim());
  let project=await Project.getProject(id);
  if(typeof project==='string'){
    ctx.body = {
      success: true,
      project: JSON.parse(project)
    };
    return next;
  }else{
    ctx.status = 400;
    ctx.body = project;
  }


};


exports.saveProject = async(ctx, next) => {
  ctx.checkBody('name').notEmpty("name不能为空");
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  let project = ctx.request.body;
  let result=await Project.saveProject(project);
  if(result===true){
    ctx.body = {
      success: true
    };
    return next;
  }else{
    ctx.status = 400;
    ctx.body = result;
  }

};


exports.modifyProject = async(ctx, next) => {
  ctx.checkParams('id').notEmpty("id不能为空");
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  let id = xss(ctx.params.id.trim());
  let project = ctx.request.body;
  let result=await Project.modifyProject(id,project);

  if(result===true){
    ctx.body = {
      success: true
    };
    return next;
  }else{
    ctx.status = 400;
    ctx.body = result;
  }

};



exports.deleteProject = async(ctx, next) => {
  ctx.checkParams('id').notEmpty("id不能为空");
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  let id = xss(ctx.params.id.trim());
  let result=await Project.deleteProject(id);
  if(result===true){
    ctx.body = {
      success: true
    };
    return next;
  }else{
    ctx.status = 400;
    ctx.body = ctx.errors;
  }
};

exports.getProjectList = async(ctx, next) => {
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  let projectList=await Project.getProjectList();

  for(let i in projectList){
    projectList[i]=projectList[i].replace(/\.json/g,'');
  }


  ctx.body = {
    success: typeof projectList==='string',
    projectList: projectList,
    length: projectList.length
  };
  return next;
};
