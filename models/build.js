const fs = require('fs');
const acmd = require('../utils/acmd');
const execSync = require('child_process').execSync;
const lodash =require('lodash');
const _fs = require('../utils/fs');


const Build={
  init(ws,data,id){
      this.ws=ws;
      this.data=data;
      this.id=id;
      this.config();
  },
  config(){
    let dependencies={};
    let index=`export {\n`;
    let packagename='';
    for(let i in this.data){
      packagename=this.data[i].name.replace('@fastweb/','').replace(/(-[a-z])/g,function($,$1){
        return $1.replace("-",'').toUpperCase();
      }).replace(/(^[a-z])/,function($,$1){
        return $1.toUpperCase();
      });
      dependencies[this.data[i].name]=this.data[i].version;
      index=`import ${packagename} from "${this.data[i].name}"\n`+index;
      index+=`${packagename},`;
    }
    index=index.replace(/,$/,'}');
    let _package={
      "project": this.id,
      "scripts": {
        "start": "WEBPACK_ENV=build webpack"
      },
      dependencies,
      "devDependencies": {
        "babel": "^6.23.0",
        "babel-core": "^6.26.0",
        "babel-eslint": "^8.0.2",
        "babel-loader": "^7.1.2",
        "babel-plugin-add-module-exports": "^0.2.1",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-stage-2": "^6.24.1",
        "css-loader": "^0.28.7",
        "eslint": "^4.10.0",
        "eslint-friendly-formatter": "^3.0.0",
        "eslint-loader": "^1.9.0",
        "eslint-plugin-html": "^3.2.2",
        "clean-webpack-plugin": "^0.1.17",
        "extract-text-webpack-plugin": "^3.0.2",
        "less": "^2.7.3",
        "less-loader": "^4.0.5",
        "node-sass": "^4.6.0",
        "optimize-css-assets-webpack-plugin": "^3.2.0",
        "sass-loader": "^6.0.6",
        "style-loader": "^0.19.0",
        "travis-release": "^1.0.1",
        "uglifyjs-webpack-plugin": "^1.0.1",
        "url-loader": "^0.6.2",
        "webpack": "^3.8.1"
      }
    };

    _package=JSON.stringify(_package, null, 2);

     this.ws.websocket.send("*****配置package.json*******\n"+_package);
     fs.writeFileSync(`data/build/package.json`, _package);
     this.ws.websocket.send("配置index.js\n"+index);
     fs.writeFileSync(`data/build/index.js`, index);
     this.install();
  },
  install(){
    this.ws.websocket.send("安装依赖...");
    acmd('cd ./data/build&&cnpm i').then(data => {
      this.ws.websocket.send('******安装完成*******');
      this.dist();
    }).catch(error => { console.log(error); });

  },
  dist(){
    acmd('cd ./data/build&&npm start').then(data => {
      this.ws.websocket.send(data);
      this.ws.websocket.send("\n*******编译成功*******");
      let project = JSON.parse(fs.readFileSync(`./data/project/${this.id}.json`));
      if(_fs.hasFile(`./data/build/dist/${this.id}/fastweb.min.css`)){
        this.ws.websocket.send("success css");

        project.css=`http://localhost:3013/${this.id}/fastweb.min.css`;
      }
      this.ws.websocket.send("success js");
      project.js=`http://localhost:3013/${this.id}/fastweb.min.js`;
      fs.writeFileSync(`data/project/${this.id}.json`, JSON.stringify(project, null, 2));
    }).catch(error => { console.log(error); });
  }
};

module.exports=Build;
