<template>
  <div>
      <h1>npm包列表</h1>
      <ul>
        <router-link v-for="npm in packageList" :to="'/npm/'+npm.name">
          <li>{{npm.name}}@{{npm.version}} <span v-if="npm.title">-{{npm.title}}</span></li>
        </router-link>
      </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  created() {
    if(this.packageList.length<=0){
      this.getPackageList()
    }
  },
  computed:{
    ...mapGetters(["packageList"])
  },
  methods:{
    ...mapActions(["getPackageList"]),
  }
}
</script>

<style scoped>
li{
  border-bottom: 1px dotted #ccc;
  padding: 10px;
}
</style>
