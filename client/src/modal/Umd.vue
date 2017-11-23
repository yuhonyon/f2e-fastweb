
<template>
    <Modal
      v-model="modalShow"
      :title="umd?'生成UMD':'生成COMMONJS'">
      <codemirror :value="code" :options="{
        mode:'hash',
        theme:'monokai'
      }"></codemirror>
      <div >
        <a download v-show="showJsDownload&&umd" href="http://localhost:3013/fastweb.min.js" >下载js</a><a download v-show="showCssDownload" href="http://localhost:3013/fastweb.min.css">下载css</a>
      </div>
    </Modal>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import { codemirror } from 'vue-codemirror-lite';
require('codemirror/mode/shell/shell');
require('codemirror/theme/monokai.css');
export default {
  name: "umd-modal",
  components: {
    codemirror
  },
  created() {
    this.initBuild()
  },
  data: () => ({
    modalShow: false,
    code:"",
    socket:null,
    showJsDownload:false,
    showCssDownload:false
  }),
  props: {
    show:false,
    umd:false,
    packageList:String
  },
  computed:{
    ...mapGetters(["compileProject"])
  },
  watch:{
    show(){
      if(this.modalShow===this.show){
        return
      }
      if(this.show){
        this.build();
      }
      this.modalShow=this.show;
    },
    modalShow(){
      if(this.modalShow===this.show){
        return
      }
      this.$emit("update:show",this.modalShow)
    }
  },
  methods:{
    build(){
      if(!this.compileProject.packageList||this.compileProject.packageList.length===0){
        return;
      }
      this.code="";
      this.showJsDownload=false;
      this.showCssDownload=false;
      this.socket.send(JSON.stringify(this.compileProject));
    },
    initBuild(){

      if(!this.socket){
         this.socket = new WebSocket("ws://127.0.0.1:3014");
        }


      this.socket.onmessage=(msg)=>{
        if(msg.data==='success js'){
          this.showJsDownload=true;
          if(!this.umd){
            this.code+="\n********生成commonJs代码********\ncnpm install ";
            for(let i in this.compileProject.packageList){
              this.code+=this.compileProject.packageList[i].name+'@'+this.compileProject.packageList[i].version+" ";
            }
            this.code+="-S\n";
          }
          return;
        };
        if(msg.data==='success css'){
          this.showCssDownload=true;
          return;
        };

        this.code+=msg.data+"\n";
      }
    }
  }
}
</script>
