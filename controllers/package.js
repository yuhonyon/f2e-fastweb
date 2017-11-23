const Package = require('../models/package');
const xss = require('xss');

exports.getALLPackage = async(ctx, next) => {

  let packageList=Package.getALLData();
  ctx.body = {
    success: true,
    packageList: packageList
  };
  return next;
};
exports.getPackage = async(ctx, next) => {
  ctx.checkQuery('name').notEmpty("name不能为空");
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  let name = xss(ctx.request.query.name.trim()).replace("@fastweb/",'');
  let _package=Package.getData(name);
  ctx.body = {
    success: true,
    package: _package
  };
  return next;
};

exports.getReadme = async(ctx, next) => {
  ctx.checkParams('id').notEmpty("id不能为空");
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  let id = xss(ctx.params.id.trim());
  let readme=Package.getReadme(id);
  ctx.body = {
    success: true,
    readme: readme
  };
  return next;
};
