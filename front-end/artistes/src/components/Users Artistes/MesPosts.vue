<template>
  <div>
    <Navbar />
    <div
      class="container"
      v-for="content in ContentId"
      :key="content.id_user_a"
    >
      <br />
      <br />
      <iframe :src="content.content" width="320" height="240" controls />
      <p><strong>Contenu:</strong> {{ content.content_type }}</p>
      <p><strong>Titre:</strong> {{ content.title }}</p>
      <!-- <video :src="content.content" width="320" height="240" controls /> -->
      <mdb-btn
        color="danger"
        icon="trash-alt"
        size="sm"
        @click="Delete(content.id_c)"
        >Supprimer</mdb-btn
      >
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../layouts/Navbar.vue";
import { mapGetters } from "vuex";
import Footer from "../../layouts/Footer.vue";
import { mdbBtn } from "mdbvue";

export default {
  name: "MesPosts",
  components: {
    Navbar,
    Footer,
    mdbBtn
  },

  data() {
    return {
      content: {
        content_type: "",
        title: "",
        date: "",
        category: "",
        duration: "",
        content: ""
      }
    };
  },
  computed: {
    ...mapGetters(["ContentId"])
  },

  methods: {
    Delete(id) {
      this.axios
        .delete(`http://localhost:8000/contents/${id}`)
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            this.$store.dispatch("deleteMyPosts", id);
          }
          alert("Le contenu à bien été supprimé");
        })
        .catch(function(error) {
          alert("impossible de supprimer le contenu");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: 0;
  padding: 0;
}
</style>
