<template>
  <div>
    <Navbar />
    <div
      class="container"
      v-for="content in ContentId"
      :key="content.id_user_a"
    >
      <iframe :src="content.content" width="320" height="240" controls />
      <p><strong>Contenu:</strong> {{ content.content_type }}</p>
      <p><strong>Titre:</strong> {{ content.title }}</p>
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

  data() {
    return {
      content: {
        content_type: "",
        title: "",
        date: "",
        category: "",
        duration: "",
        content: "",
        id_user_a: this.$store.state.tokenId
      }
    };
  },
  computed: {
    ...mapGetters(["ContentId"])
  },

  methods: {}
  // beforeMount() {
  //   console.log(this.AllContent);
  //   this.axios
  //     .get(`http://localhost:8000/contents/${this.$store.state.tokenId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.$store.dispatch("decodeTokenId", response.data.id_user_a),
  //         this.$store.dispatch("recContent", response.data.id_a);
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
