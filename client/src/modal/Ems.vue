<template>
    <Modal
      v-model="modalShow"
      title="EMS 安装代码">
      <codemirror :value="code" :options="{
        mode:'hash',
        theme:'monokai'
      }"></codemirror>
    </Modal>
</template>
<script>
import { codemirror } from 'vue-codemirror-lite';
require('codemirror/mode/shell/shell');
require('codemirror/theme/monokai.css');
export default {
  name: "ems-modal",
  components: {
    codemirror
  },
  data: () => ({
    modalShow: false
  }),
  props: {
    show:false,
    code:String
  },
  watch:{
    show(){
      if(this.modalShow===this.show){
        return
      }
      this.modalShow=this.show;
    },
    modalShow(){
      if(this.modalShow===this.show){
        return
      }
      this.$emit("update:show",this.modalShow)
    }
  }
}
</script>
