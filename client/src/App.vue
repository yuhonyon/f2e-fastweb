<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
  <Row type="flex">
    <Col :span="spanLeft" class="layout-menu-left">
    <Menu ref="sidebar" :active-name="activeName" theme="dark" width="auto">
      <div class="layout-logo-left"></div>
      <router-link to="/project">
        <MenuItem name="1">
        <Icon type="ios-navigate" :size="iconSize"></Icon>
        <span class="layout-text">我的项目</span>
        </MenuItem>
      </router-link>
      <router-link to="/work">
        <MenuItem name="2">
        <Icon type="ios-keypad" :size="iconSize"></Icon>
        <span class="layout-text">工作台</span>
        </MenuItem>
      </router-link>
      <router-link to="/npm">
        <MenuItem name="3">
        <Icon type="ios-analytics" :size="iconSize"></Icon>
        <span class="layout-text">npm包</span>
        </MenuItem>
      </router-link>
    </Menu>
    </Col>
    <Col :span="spanRight">
    <div class="layout-header">
      <Button type="text" @click="toggleClick">
           <Icon type="navicon" size="32"></Icon>
       </Button>
      <div class="fr">
        <NavHeader></NavHeader>
      </div>
    </div>
    <!-- <div class="layout-breadcrumb">
                   <Breadcrumb>
                       <BreadcrumbItem href="#">Index</BreadcrumbItem>
                       <BreadcrumbItem href="#">Apps</BreadcrumbItem>
                       <BreadcrumbItem>App</BreadcrumbItem>
                   </Breadcrumb>
               </div> -->
    <div class="layout-content">
      <div class="layout-content-main">
        <router-view/>
      </div>
    </div>
    <div class="layout-copy">
      2011-2016 &copy; TalkingData
    </div>
    </Col>
  </Row>
</div>
</template>

<script>
import NavHeader from '@/components/Header';
export default {
  name: 'app',
  components: {
    NavHeader
  },
  data() {
    return {
      spanLeft: 5,
      spanRight: 19
    }
  },
  watch:{
    $route(){
       this.$nextTick(function () {
         this.$refs.sidebar.updateActiveName()
       })
    }
  },
  computed: {
    iconSize() {
      return this.spanLeft === 5 ? 14 : 24;
    },
    activeName(){
      if(this.$route.name==="Work"){
        return "2";
      }else if(this.$route.name==="Npm"||this.$route.name==="NpmList"){
        return "3";
      }else{
        return "1";
      }
    }
  },
  methods: {

    toggleClick() {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    }
  }
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  ;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-content {
  height: 100%;
padding: 15px;
overflow: auto;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
  padding-bottom: 70px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-menu-left {
  background: #464c5b;
}

.layout-header {
  height: 60px;
  line-height: 60px;
  padding-right: 25px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.layout-ceiling-main a {
  color: #9ba7b5;
}

.layout-hide-text .layout-text {
  display: none;
}

.ivu-row-flex {
  height: 100%;
}

.ivu-col {
  height: 100%;
  transition: width .2s ease-in-out;
}
</style>
