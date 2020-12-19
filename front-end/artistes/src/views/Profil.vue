<template>
  <div class="profil">
    <header><Navbar /></header>

    <p>Hello</p>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../layouts/Navbar.vue";
import Footer from "../layouts/Footer.vue";
export default {
  name: "Profil",
  components: {
    Navbar,
    Footer,
  },
};
</script>