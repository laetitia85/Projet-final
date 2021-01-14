<template>
  <div>
    <Navbar />
    <div
      class="container"
      v-for="content in AllContent"
      :key="content.id_user_a"
    >
      <iframe :src="content.content" width="320" height="240" controls />
      <p><strong>Contenu:</strong> {{ content.content_type }}</p>
      <p><strong>Titre:</strong> {{ content.title }}</p>
      <!-- <p><strong>Durée:</strong> {{ content.duration }}</p> -->
      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/_qW_DkVyMuk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      <!-- <video :src="content.content" width="320" height="240" controls /> -->
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
    ...mapGetters(["AllContent"])
  }

  // methods: {},
  // mounted() {
  //   console.log(this.AllContent);
  //   this.axios
  //     .get(`http://localhost:8000/contents/${this.$store.state.tokenId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.$store.dispatch("decodeTokenId", response.data.id_user_a),
  //         this.$store.dispatch("recContent", response.data.id_c);
  //     });
  // }
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
