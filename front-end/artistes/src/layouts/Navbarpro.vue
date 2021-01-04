<template>
  <div>
    <mdb-navbar class="bgcolornav">
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item
            ><router-link to="/profil" active>Profil</router-link></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/posts">Posts</router-link></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/comments"
              >Commentaires</router-link
            ></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/contact">Contact</router-link></mdb-nav-item
          >
        </mdb-navbar-nav>
        <b-button variant="outline-primary" @click="DeleteTokenPro()"
          >Sign-Out</b-button
        >
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
import { mdbNavbar, mdbNavItem, mdbNavbarNav, mdbNavbarToggler } from "mdbvue";
export default {
  name: "Navbar",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler
  },

  methods: {
    DeleteTokenPro() {
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
</style>