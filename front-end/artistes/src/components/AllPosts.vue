<template>
  <div>
    <Navbarpro />
    <div class="container" v-for="content in AllContent" :key="content.id_c">
      <p>bonjour</p>
      <iframe :src="content.content" width="320" height="240" controls />
      <p><strong>Contenu:</strong> {{ content.content_type }}</p>
      <p><strong>Titre:</strong> {{ content.title }}</p>
      <p><strong>Durée:</strong> {{ content.duration }}</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../layouts/Navbarpro.vue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";

export default {
  name: "AllPosts",
  components: {
    Navbarpro,
    Footer
  },
  computed: {
    ...mapGetters(["AllContent"])
  }

  //  computed: {
  //       Contents: function() {return this.$store.state.contents}
  //     },
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
