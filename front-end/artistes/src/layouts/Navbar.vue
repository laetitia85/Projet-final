<template>
  <div id="conteneur">
    <mdb-navbar position="top" dark color="indigo" scrolling>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="<Profil/>" active>Profil</mdb-nav-item>
          <mdb-nav-item href="#">Créations</mdb-nav-item>
          <mdb-nav-item href="#">Mes posts</mdb-nav-item>
        </mdb-navbar-nav>
        <p>
          <b-button variant="outline-primary" @click="DeleteToken()"
            >Sign-Out</b-button
          >
        </p>
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
    mdbNavbarToggler,
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

<style lang="postcss" scoped>
#conteneur {
  display: flex;
  justify-content: space-between;
  border: 3px solid black;
  width: 100%;
  margin: 0px 0px 0px 0px;
  background-color: black;
  box-shadow: 6px 6px 0px blue;
  color: blue;
}
p {
  margin: auto;
}
</style>
