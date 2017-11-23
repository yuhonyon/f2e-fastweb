const fs = require('fs');
const marked = require('marked');
const cmd = require('../utils/cmd');
const data = JSON.parse(fs.readFileSync('data/data.json'));
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

const allData={};
for(let i in data){
  let readme=marked(data[i].readme);
  let title=readme.match(/<h1[^>]*>.*<\/h1>/);

  allData[i]={
    "title": title?title[0].replace(/<[^>]+>|\s/g,'').substring(0,20):"",
    "name": data[i].name,
    "versions": data[i].versions,
    "common": data[i].common,
    "readme": readme
  };
}

const Package = {
  getALLData(){
    let datas=[];
    for(let i in allData){
      datas.push({"name": allData[i].name,"versions": allData[i].versions,"common": allData[i].common,"title": allData[i].title,"selected": false,"version": allData[i].versions[allData[i].versions.length-1]});
    }
    return datas;
  },
  getData(name){
    if(!allData[name]){
      name=name.replace(/(-[a-z])/g,function($,$1){
        return $1.replace("-",'').toUpperCase();
      });
    }
    return allData[name];
  },
  getReadme(name){
    return allData[name].readme;
  }
};
module.exports = Package;
