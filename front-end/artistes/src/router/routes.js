import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store.js";
//ARTISTES
import Home from "../views/Home.vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
import Profil from "../views/Profil.vue";
import Creations from "../components/Creations.vue";
import AddContent from "../components/AddContent.vue";
import MesPosts from "../components/MesPosts.vue";
import Contact from "../views/Contact.vue";
//PRO
import SignUpPro from "../components/SignUpPro.vue";
import SignInPro from "../components/SignInPro.vue";
import ProfilPro from "../views/ProfilPro.vue";
import AllPosts from "../components/AllPosts.vue";
import ContactPro from "../views/ContactPro.vue";
//ADMIN
import SignUpAdmin from "../components/SignUpAdmin.vue";
import SignInAdmin from "../components/SignInAdmin.vue";
import ProfilAdmin from "../views/ProfilAdmin.vue";
import Users from "../components/Users.vue";
import Posts from "../components/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  //ARTISTES
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn
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
    path: "/mesposts",
    name: "MesPosts",
    component: MesPosts
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
      let x = to.matched.some(elem => elem.meta.requiresAuth);
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
  //PRO
  {
    path: "/sign-up-pro",
    name: "SignUpPro",
    component: SignUpPro
  },
  {
    path: "/sign-in-pro",
    name: "SignInPro",
    component: SignInPro
  },
  {
    path: "/allposts",
    name: "AllPosts",
    component: AllPosts
  },
  {
    path: "/contact-pro",
    name: "ContactPro",
    component: ContactPro
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
      let y = to.matched.some(elem => elem.meta.requiresAuth);
      console.log(y);

      if (y == true && store.state.tokenPro) {
        next();
      } else {
        next({
          path: "/"
        });
      }
    }
  },
  //ADMIN

  {
    path: "/sign-up-admin",
    name: "SignUpAdmin",
    component: SignUpAdmin
  },
  {
    path: "/sign-in-admin",
    name: "SignInAdmin",
    component: SignInAdmin
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts
  },
  {
    path: "/profil-admin",
    name: "ProfilAdmin",
    component: ProfilAdmin,
    meta: {
      requiresAuthAdmin: true,
      layout: "NavbarAdmin.vue"
    },
    beforeEnter: (to, from, next) => {
      let z = to.matched.some(elem => elem.meta.requiresAuthAdmin);
      console.log(z);

      if (z == true && store.state.tokenAdmin) {
        next();
      } else {
        next({
          path: "/"
          // params: { nextUrl: to.fullPath },
        });
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
