<template>
  <div>
    <Navbar />
    <div
      class="container"
      v-for="content in ContentId"
      :key="content.id_user_a"
    >
      <p><strong>Titre:</strong> {{ content.title }}</p>
      <p><strong>Date:</strong> {{ content.date }}</p>
      <p><strong>Durée:</strong> {{ content.duration }}</p>
      <p><strong>Contenu:</strong> {{ content.content_type }}</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../layouts/Navbar.vue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";

export default {
  name: "MesPosts",
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters(["ContentId"])
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
}
</style>
