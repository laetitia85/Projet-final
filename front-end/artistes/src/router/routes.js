import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../components/SignUp.vue";
import SignUpPro from "../components/SignUpPro.vue";
import SignIn from "../components/SignIn.vue";
import SignInPro from "../components/SignInPro.vue";
import Profil from "../views/Profil.vue";
import ProfilPro from "../views/ProfilPro.vue";
import Contact from "../views/Contact.vue";
import Creations from "../components/Creations.vue";
import AddContent from "../components/AddContent.vue";
import store from "../store/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/sign-up-pro",
    name: "SignUpPro",
    component: SignUpPro
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/sign-in-pro",
    name: "SignInPro",
    component: SignInPro
  },
  {
    path: "/add-contents",
    name: "AddContent",
    component: AddContent
  },
  {
    path: "/creations",
    name: "Creations",
    component: Creations
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: {
      requiresAuth: true,
      layout: "Navbar.vue"
    },
    beforeEnter: (to, from, next) => {
      // console.log(store.state.token);
      let x = to.matched.some((elem) => elem.meta.requiresAuth);
      console.log(x);

      if (x == true && store.state.token) {
        next();
      } else {
        next({
          path: "/"
          // params: { nextUrl: to.fullPath },
        });
      }
    }
  },
  {
    path: "/profil-pro",
    name: "ProfilPro",
    component: ProfilPro,
    meta: {
      requiresAuth: true,
      layout: "Navbarpro.vue"
    },
    beforeEnter: (to, from, next) => {
      // console.log(store.state.tokenPro);
      let x = to.matched.some((elem) => elem.meta.requiresAuth);
      console.log(x);

      if (x == true && store.state.tokenPro) {
        next();
      } else {
        next({
          path: "/"
          // params: { nextUrl: to.fullPath },
        });
      }
    }
  }
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
  routes
});

export default router;
