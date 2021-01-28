<template>
  <div class="bgcolornav">
    <mdb-navbar>
      <mdb-navbar-nav class="linknav">
        <mdb-nav-item active
          ><router-link to="/">Accueil</router-link></mdb-nav-item
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

.title {
  text-align: center;
  font-family: charm;
}

.micro {
  height: 50px;
  width: 20px;
}
.linknav a {
  color: white;
}
.linknav a:hover {
  color: white;
}
</style>
