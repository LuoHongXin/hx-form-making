import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/doc',
  },
  {
    path: '/doc',
    name: 'doc',
    component: () => import(/*webpackChunkName:"doc "*/ '../views/doc'),
    meta: {
      title: '表单设计器文档',
      hideMenu: true,
    },
  },
  {
    path: '/yjzformMaking',
    name: 'yjzformMaking',
    component: () => import(/*webpackChunkName:"yjzformMaking "*/ '../views/yjzformMaking'),
    meta: {
      title: '表单设计器',
      hideMenu: true,
    },
  },
  {
    path: '/yjzformGenerator',
    name: 'yjzformGenerator',
    component: () => import(/*webpackChunkName:"yjzformGenerator "*/ '../views/yjzformGenerator'),
    meta: {
      title: '表单生成器',
      hideMenu: true,
    },
  },
];

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
