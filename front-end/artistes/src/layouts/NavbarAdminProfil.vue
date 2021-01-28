<template>
  <div>
    <mdb-navbar class="bgcolornav">
      <mdb-navbar-toggler>
        <mdb-navbar-nav class="linknav">
          <mdb-nav-item
            ><router-link to="/profil-admin" active
              >Profil</router-link
            ></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/users"
              >Gestion <br />
              Utilisateurs</router-link
            ></mdb-nav-item
          >
          <mdb-nav-item
            ><router-link to="/posts"
              >Gestion <br />
              Posts</router-link
            ></mdb-nav-item
          >
          <mdb-btn gradient="aqua" rounded @click="DeleteTokenAdmin()"
            >Deconnexion</mdb-btn
          >
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbBtn
} from "mdbvue";

export default {
  name: "NavbarAdmin",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn
  },

  methods: {
    DeleteTokenAdmin() {
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
.linknav a {
  color: white;
}
</style>
