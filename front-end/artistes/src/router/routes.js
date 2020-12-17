import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profil from "../views/Profil.vue";
import store from "../store/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      // console.log(store.state.token);
      let x = to.matched.some((elem) => elem.meta.requiresAuth);
      console.log(x);

      if (x == true && store.state.token) {
        next();
      } else {
        next({
          path: "/",
          // params: { nextUrl: to.fullPath },
        });
      }
    },
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
