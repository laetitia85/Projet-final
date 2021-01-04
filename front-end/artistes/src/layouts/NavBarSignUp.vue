<template>
  <div class="bgcolornav">
    <mdb-navbar>
      <mdb-navbar-nav>
        <mdb-nav-item active
          ><router-link to="/">Bienvenue</router-link></mdb-nav-item
        >
        <mdb-nav-item
          ><router-link to="/sign-in">Se connecter</router-link></mdb-nav-item
        >
      </mdb-navbar-nav>
    </mdb-navbar>
  </div>
</template>

<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem } from "mdbvue";

export default {
  name: "NavBarSignUp",
  components: {
    mdbNavbar,
    mdbNavbarNav,
    mdbNavItem,
  },
};
</script>

<style>
.bgcolornav {
  background-image: url("../images/bgnavbar.jpg");
}
</style>
