<template>
  <div id="">
    <h1>{{packageInfo.name}}-@{{packageInfo.versions[packageInfo.versions.length-1]}}</h1>
    <div class="markdownStyle" v-html="packageInfo.readme">

    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    packageInfo:{
      versions:[]
    }
  }),
  created(){
    fetchApi.fetchGetPackage({name:this.npmName}).then(data=>{
      this.packageInfo=data.package;
    })
  },
  computed:{
    npmName(){
     return this.$route.path.replace(/^\/npm\//,"");
    }
  }
}
</script>
<style >
@import 'highlight.js/styles/github.css';
</style>
