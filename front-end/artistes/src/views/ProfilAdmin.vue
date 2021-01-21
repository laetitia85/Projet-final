<template>
  <div>
    <NavbarAdmin />
    <div class="container">
      <p>Hello</p>
      <p>Bienvenue {{ TokenName }}</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarAdmin from "../layouts/NavbarAdmin.vue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";

export default {
  name: "ProfilAdmin",
  components: {
    Footer,
    NavbarAdmin
  },

  computed: {
    ...mapGetters(["TokenName"])
  }
};
</script>

<style lang="scss" scoped></style>
