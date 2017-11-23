<template>
  <div>
    <ems :show.sync="emsShow" :code="emsCode"></ems>
    <umd :show.sync="umdShow"></umd>
    <Button @click="newProject">新建项目</Button>
    <Button v-if="showSave" @click="save">保存</Button>
    <Dropdown v-if="showOut"  @on-click="selectEms">
        <Button>
            生成代码
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem name="1">EMS</DropdownItem>
            <DropdownItem name="2">COMMONJS</DropdownItem>
            <DropdownItem name="3">UMD</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
  import {Ems,Umd} from "../modal/";
  import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {
      Ems,
      Umd
    },
    data() {
      return {
        emsShow:false,
        umdShow:false,
        newProjectName:'',
        emsCode:''
      };
    },
    computed:{
      ...mapGetters(['editingPackage',"project","compileProject"]),
      showSave(){
        return this.$route.name=="Work"&&this.project&&this.project.name;
      },
      showOut(){
        if(!this.compileProject.packageList||this.compileProject.packageList<=0){
          return false;
        }
        return this.$route.name=="Project"||(this.$route.name=="Work"&&this.project.packageList);
      }
    },
    methods: {
      ...mapActions(["getProject"]),
      selectEms(name){
        if(name==1){
          this.getEmsCode()
          this.emsShow=true;
        }else if(name==2){
          this.umdShow=true;
        }

      },
      getEmsCode(){
        let code="cnpm install ";
        for(let i in this.compileProject.packageList){
            code+=(" "+this.compileProject.packageList[i].name)
        }
        code+=" -S";
        this.emsCode=code;
      },
      newProject(){
        this.newProjectName="";
        this.$Modal.confirm({
            title: '新建项目',
            onOk: () => {
              fetchApi.fetchNewProject({"name":this.newProjectName}).then(()=>{
                this.getProject({"name":this.newProjectName});
                this.$Message.success('创建成功');
                this.$router.push({path:"work"});
              })
            },
            onCancel:() => {
              this.newProjectName="";
            },
            render: (h) => {
                return h('Input', {
                    props: {
                        value: this.newProjectName,
                        autofocus: true,
                        placeholder: '请输入项目名'
                    },
                    style:{
                      'margin-top':'30px'
                    },
                    on: {
                        input: (val) => {
                            this.newProjectName = val;
                        }
                    }
                })
            }
        })
      },

      save(){
        let packageList=this.editingPackage.filter(val=>(val.selected===true));

        fetchApi.fetchSaveProject(this.project.name,{packageList:packageList}).then(()=>{
            this.$Message.success('保存成功');
            this.getProject(this.project.name)
        });
      }
    }
  }
</script>
