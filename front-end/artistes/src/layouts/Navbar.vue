<template>
  <div>
    <mdb-navbar class="bgcolornav">
      <mdb-navbar-toggler>
        <mdb-navbar-nav class="linknav">
          <mdb-nav-item
            ><router-link to="/profil" active>Profil</router-link></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/creations">Créations</router-link></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/mesposts">Mes posts</router-link></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/contact">Contact</router-link></mdb-nav-item
          >
        </mdb-navbar-nav>
        <img class="picture_profil" alt="" :src="TokenPicture_profil" />
        <mdb-btn gradient="aqua" rounded @click="DeleteToken()"
          >Deconnexion</mdb-btn
        >

        <!-- <b-button variant="outline-primary" @click="DeleteToken()"
          >Deconnexion</b-button
        > -->
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbBtn
} from "mdbvue";
export default {
  name: "Navbar",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn
  },

  computed: {
    ...mapGetters(["TokenPicture_profil"])
  },

  methods: {
    DeleteToken() {
      this.$store.dispatch("deleteToken").then(() => {
        this.$router.push("/");
      });
    },
  },
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
.linknav a {
  color: white;
}
</style>
