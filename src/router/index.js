/*
 * @Author: lzd
 * @Date: 2020-09-03 23:59:26
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-08 10:54:58
 * @Description: content description
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "frameView"
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
    component: () => import(/* webpackChunkName: "about" */ "../views/Test.vue")
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
      next({ path: "/b" });
    }
  } else {
    next();
  }
});

export default router;
