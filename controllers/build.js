const Koa = require('koa');
const Build = require('../models/build');
const app=require('koa-websocket')(new Koa());




app.ws.use((ctx) => {
  ctx.websocket.on("close",function(){

  });
  ctx.websocket.on('message', function(message) {
    if(message==="close"){
      ctx.websocket.close();
      return;
    }

    if(/^\{[\s\S]*\}$/.test(message)){
      let projectData=JSON.parse(message);
      Build.init(ctx,projectData.packageList,projectData.name);
    }


  });
});





app.listen(3014);
