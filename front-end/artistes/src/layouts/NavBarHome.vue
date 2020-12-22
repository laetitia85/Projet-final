<template>
  <div class="bgcolornav">
    <mdb-navbar>
      <mdb-navbar-nav>
        <mdb-nav-item href="/" active>Bienvenue</mdb-nav-item>
        <h1>ARTISTES</h1>
      </mdb-navbar-nav>
    </mdb-navbar>
  </div>
</template>

<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem } from "mdbvue";

export default {
  name: "NavBarFirst",
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
h1 {
  text-align: center;
}
</style>
