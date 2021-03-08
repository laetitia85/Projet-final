<template>
  <div>
    <mdb-navbar class="bgcolornav">
      <mdb-navbar-nav class="linknav">
        <mdb-nav-item
          ><router-link to="/profil-pro" active
            >Profil</router-link
          ></mdb-nav-item
        >
        <mdb-nav-item
          ><router-link to="/allposts">Posts</router-link></mdb-nav-item
        >
        <mdb-nav-item
          ><router-link to="/allComments"
            >Commentaires</router-link
          ></mdb-nav-item
        >
        <mdb-nav-item
          ><router-link to="/contact-pro">Contact</router-link></mdb-nav-item
        >
      </mdb-navbar-nav>
      <img class="picture_profil" alt="" :src="TokenPicture" />
      <mdb-btn class="decobtn" gradient="aqua" rounded @click="DeleteTokenPro()"
        >Deconnexion</mdb-btn
      >
    </mdb-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { mdbNavbar, mdbNavItem, mdbNavbarNav, mdbBtn } from "mdbvue";

export default {
  name: "Navbar",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbBtn
  },
  computed: {
    ...mapGetters(["TokenPicture"])
  },

  methods: {
    DeleteTokenPro() {
      this.$store.dispatch("deleteToken").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
.bgcolornav {
  background-image: url("../images/bgnavbar.jpg");
}
.picture_profil {
  border-radius: 50px;
  height: 60px;
  width: 60px;
}
.decobtn {
  border: 1px solid white;
}
.linknav a {
  color: white;
}
</style>
