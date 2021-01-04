<template>
  <div class="bgcolornav">
    <mdb-navbar>
      <mdb-navbar-nav>
        <mdb-nav-item active
          ><router-link to="/">Bienvenue</router-link></mdb-nav-item
        >
      </mdb-navbar-nav>
      <h1 class="title">
        ART<img class="micro" src="../images/micro titre.png" alt="" />STES
      </h1>
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
    mdbNavItem
  }
};
</script>

<style>
.bgcolornav {
  background-image: url("../images/bgnavbar.jpg");
}

mdb-nav-item:active {
  color: white !important;
}

.title {
  text-align: center;
  font-family: charm;
}

.micro {
  height: 50px;
  width: 20px;
}
</style>
