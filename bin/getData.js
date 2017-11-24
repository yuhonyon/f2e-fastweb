#!/usr/bin/env node
const fs = require('fs');
const execSync = require('child_process').execSync;
const lodash =require('lodash');
const cmd=require('../utils/cmd');
const _fs=require('../utils/fs');

function getVersions(name) {
  try {
    let versions = cmd(`npm view ${name} version`);
    if (versions) {
      return JSON.parse(versions);
    }
    return null;
  } catch (e) {
    return null;
  }
}


if(_fs.hasFile('./directory/directory.json')){
  console.log(cmd("cd ./directory&&git pull origin master"));
}else{
  console.log(cmd("git clone http://fangyangyu@gitlab.91jkys.com/f2e/directory.git"));
}

const directory = JSON.parse(fs.readFileSync('directory/directory.json'));
let data = JSON.parse(fs.readFileSync('data/data.json'));
lodash.merge(data,directory);


for (let i in data) {
  let versions = cmd(`cnpm view ${data[i].name} versions`).replace(/[\]\s"\[']/g, '').split(",");

  if(data[i].versions&&data[i].versions[data[i].versions.length-1]===versions[versions.length-1]){
    console.log(`${data[i].name}为最新版本`);
    continue;
  }
  console.log(data[i]);
  data[i].versions=versions;
  console.log(`更新${data[i].name}中...`);
  console.log(cmd(`cnpm i ${data[i].name}@${data[i].versions[data[i].versions.length - 1]} -S`));
  if(fs.existsSync(`node_modules/${data[i].name}/README.md`)){
    data[i].readme=fs.readFileSync(`node_modules/${data[i].name}/README.md`).toString();
  }
  console.log(`${data[i].name}更新完成`);
  fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));
}

console.log(cmd("cd client&&cnpm i&&npm run "));

console.log("******全部更新完成*****");
