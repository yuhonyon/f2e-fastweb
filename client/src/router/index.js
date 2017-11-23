import Vue from 'vue';
import Router from 'vue-router';
import Npm from '@/views/npm/Npm';
import NpmList from '@/views/npm/NpmList';

import Work from '@/views/work/Work';
import Project from '@/views/project/Project';
import ProjectList from '@/views/project/ProjectList';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/project'
    },
    {
      path: '/work',
      name: 'Work',
      component: Work
    },
    {
      path: '/project',
      name: 'ProjectList',
      component: ProjectList
    },{
      path: '/project/:id',
      name: 'Project',
      component: Project
    },
    {
      path: '/npm',
      name: 'NpmList',
      component: NpmList
    },{
      path: '/npm/*/:id',
      name: 'Npm',
      component: Npm
    },{
      path: '/npm/:id',
      name: 'Npm',
      component: Npm
    },
    {
        path: '*',
        redirect: '/project'
    }
  ]
});
