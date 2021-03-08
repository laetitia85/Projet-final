<template>
  <div class="bgcolornav">
    <mdb-navbar>
      <mdb-navbar-nav class="linknav">
        <mdb-nav-item active
          ><router-link to="/">Accueil</router-link></mdb-nav-item
        >
      </mdb-navbar-nav>
      <h1 class="navbar-brand" id="text">
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
.navbar-brand {
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
  margin: 0;
  font-size: 60px;
}
.navbar-brand h1 {
  font-family: charm;
  margin: 0;
}
#text{
  margin: 0;
  font-family: charm;
  font-size: 40px;
  color: black;
}
.micro {
  height: 43px;
  width: 20px;
}
.linknav a {
  color: white;
}
.linknav a:hover {
  color: white;
}
</style>
