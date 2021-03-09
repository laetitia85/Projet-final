<template>
  <div>
    <Navbarpro />
    <div class="contain" v-for="comment in CommentId" :key="comment.id_com">
      <br /><br />
      <p><strong>Commentaire:</strong> <br />{{ comment.comments }}</p>
      <mdb-btn
        color="danger"
        icon="trash-alt"
        size="sm"
        @click="Delete(comment.id_com)"
        >Supprimer</mdb-btn
      >
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../../layouts/Navbarpro.vue";
import { mapGetters } from "vuex";
import Footer from "../../layouts/Footer.vue";
import { mdbBtn } from "mdbvue";

export default {
  name: "AllComments",
  components: {
    Navbarpro,
    Footer,
    mdbBtn
  },

  data() {
    return {
      comments: {
        comment: ""
      }
    };
  },
  computed: {
    ...mapGetters(["CommentId"])
  },

  methods: {
    Delete(id) {
      let res = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?");
      if (res) {
        this.axios
          .delete(`http://localhost:8000/comments/${id}`)
          .then(response => {
            console.log(response.data);
            if (response.status === 200) {
              this.$store.dispatch("deleteMyComments", id);
            }
            alert("Le commentaire à bien été supprimé");
          })
          .catch(function(error) {
            alert("impossible de supprimer le commentaire");
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.contain {
  background-color: rgb(64, 224, 208, 0.25);
  padding-right: 20px;
  padding-left: 20px;
  margin: 0;
  width: 100%;
  min-height: 80vh;
}
</style>
