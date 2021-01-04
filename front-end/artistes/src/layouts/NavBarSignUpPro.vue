<template>
  <div class="bgcolornav">
    <mdb-navbar>
      <mdb-navbar-nav>
        <mdb-nav-item href="/" active>Bienvenue</mdb-nav-item>
         <mdb-nav-item href="/sign-in-pro" active>Se connecter</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar>
  </div>
</template>

<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem } from "mdbvue";

export default {
  name: "NavBarSignUpPro",
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