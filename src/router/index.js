/*
 * @Author: lzd
 * @Date: 2020-09-03 23:59:26
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-10 15:13:06
 * @Description: content description
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
//重写push 用来处理他的本页面跳本页面的报错，让人不开心。

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
    meta: { requiresAuth: true }
  },
  {
    path: "/frameView",
    name: "FrameView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/index_frame/FrameView.vue"
      )
  },
  {
    path: "/test",
    name: "Test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test/Test.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/Login.vue")
  },
  {
    path: "/overview",
    name: "overview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/equipment_overview/EquipmentOverview.vue"
      )
  },
  {
    path: "/details",
    name: "details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/equipment_details/EquipmentDetails.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * @to 跳到的路由对象
 * @from 来的路由对象
 * @next  可以next(/a)之类的方式跳转另外的路由
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.userId) {
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
