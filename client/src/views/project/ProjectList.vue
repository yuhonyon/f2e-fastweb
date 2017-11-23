<template>
  <div id="">
      <h1>项目列表</h1>
      <ul>
        <router-link  v-for="project in projectList" :to="'project/'+project">
        <li>
          {{project}}
        </li>
        </router-link>
      </ul>
  </div>
</template>
<script>
export default {
  name: "ProjectList",
  created() {
    this.fetchData();
  },
  data: () => ({
    projectList:[]
  }),
  methods: {
    fetchData() {
      fetchApi.fetchGetProjectList().then(data=>{
        this.projectList=data.projectList;
      })
    }
  }
}
</script>
<style scoped>
li{
  border-bottom: 1px dotted #ccc;
  padding: 10px;
}
</style>
