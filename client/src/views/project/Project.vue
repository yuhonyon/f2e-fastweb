<template>
  <div id="">
    <h1>{{curProject.name}}</h1>
    <p>创建时间:{{curProject.createTime}}</p>
    <p v-if="curProject.changeTime">最近修改时间:{{curProject.changeTime}}</p>
    <h3>npm 包</h3>
    <ul class="">
       <li v-for="_package in curProject.packageList">
        <span>
          {{_package.name}}-{{_package.version}}({{_package.title}})
        </span>
       </li>
    </ul>

    <div>
      <h3>ems code</h3>
      <div class="emsCode">
        <codemirror :value="emsCode" :options="{
          mode:'hash',
          theme:'monokai',
          height:50

        }"></codemirror>
      </div>
    </div>

    <div>
      <h3>commonjs code</h3>
      <div class="commonCode">
        <codemirror :value="commonCode" :options="{
          mode:'hash',
          theme:'monokai',
          height:50

        }"></codemirror>
        <a download :href="curProject.css"  v-show="curProject.css">下载css</a>
      </div>
    </div>

    <div v-show="curProject.js">
      <h3>umd code</h3>
      <a download v-show="curProject.css" :href="curProject.css">下载css</a>
      <a download v-show="curProject.js" :href="curProject.js">下载js</a>
    </div>
    <div class="btn">
      <router-link to="/work" v-show="!!curProject.name"><Button class="edit" @click="edit" type="primary">编辑</Button></router-link>
      <Button @click="remove" type="error">删除</Button>
    </div>



  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import { codemirror } from 'vue-codemirror-lite';
require('codemirror/mode/shell/shell');
require('codemirror/theme/monokai.css');
export default {
  name: "Project",
  created() {
    this.fetchData();
  },
  components:{
    codemirror
  },


  computed:{
    ...mapGetters(["curProject"]),
    projectId(){
      return this.$route.params.id;
    },
    commonCode(){
      if(!this.curProject.packageList){
        return "";
      }
      let code="cnpm install ";
      for(let i in this.curProject.packageList){
        code+=(this.curProject.packageList[i].common||this.curProject.packageList[i].name)+"@"+this.curProject.packageList[i].version+" ";
      }
      code+="-S";
      return code;
    },
    emsCode(){
      if(!this.curProject.packageList){
        return "";
      }
      let code="cnpm install ";
      for(let i in this.curProject.packageList){
        code+=this.curProject.packageList[i].name+"@"+this.curProject.packageList[i].version+" ";
      }
      code+="-S";
      return code;
    }
  },
  methods: {
    ...mapActions(["getProject",'changeCurProject',"deleteProject"]),
    fetchData() {
      this.changeCurProject(this.projectId)
    },
    edit(){
      this.getProject(this.curProject)
    },
    remove(){
      this.$Modal.confirm({
          title: '警告',
          content: '确定删除?',
          onOk: () => {
              this.deleteProject(this.curProject.name).then(()=>{
                this.$Message.info('删除成功');
                this.$router.replace({
                  path:"/project"
                })
              })

          },
          onCancel: () => {

              this.$Message.info('取消删除');
          }
      });
    }
  }

}
</script>
<style scoped>
h3{
  margin-top: 30px;
  margin-bottom: 10px;;
}
.btn{
  margin-top: 50px;
}
</style>
<style>
  .emsCode .CodeMirror,.commonCode .CodeMirror{
    height: 100px;
    margin-bottom: 10px;
    margin-top:10px;
  }
</style>
