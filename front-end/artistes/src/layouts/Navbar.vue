<template>
  <div>
    <mdb-navbar class="bgcolornav">
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="/profil" active>Profil</mdb-nav-item>
          <mdb-nav-item href="/creations">Créations</mdb-nav-item>
          <mdb-nav-item href="/rec-contents">Mes posts</mdb-nav-item>
           <mdb-nav-item href="/contact">Contact</mdb-nav-item>
        </mdb-navbar-nav>
        <img class="picture_profil" alt="" src="{TokenPicture_profil}" />
        <b-button variant="outline-primary" @click="DeleteToken()"
          >Deconnexion</b-button
        >
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { mdbNavbar, mdbNavItem, mdbNavbarNav, mdbNavbarToggler } from "mdbvue";
export default {
  name: "Navbar",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
  },

  computed: {
    ...mapGetters(["TokenPicture_profil"]),
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
  height: 40px;
  width: 40px;
}
</style>
