<template>
  <div id="work">
    <div v-if="project.name">
      <h1>{{project.name}}</h1>
    </div>
    <ul class="packageList">
       <li v-for="_package in editingPackage">
         <Checkbox class="selected" v-model="_package.selected"></Checkbox>
         <Select class="version" size="small" v-model="_package.version" placeholder="请选择">
          <Option
            v-for="version in _package.versions"
            :key="version"
            :value="version">{{version}}
          </Option>
        </Select>
        <span>
          {{_package.name}}({{_package.title}})
        </span>
       </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: "work",
  created() {
    this.fetchData();
    if(!this.project.packageList){
      this.getProject();
    }
  },
  computed:{
    ...mapGetters(['editingPackage','project'])
  },
  methods: {
    ...mapActions(["getPackageList","getProject"]),
    fetchData() {
      this.getPackageList()
    }
  }
}
</script>
<style>
.version{
  width:80px;
}
.selected{

}
.packageList{
  list-style: none;
  padding: 0;
}
.packageList>li{
  float: left;
  min-width: 45%;
  margin-right: 3%;
  margin-bottom: 30px;
}
</style>
