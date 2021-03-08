<template>
  <div>
    <Navbarpro />
    <div class="contain">
      <br>
      <textarea  @reset="onReset"
        name="commentaire"
        v-model="comments.comments"
        value="comments.comments"
        class="textarea"
        cols="30"
        rows="5"
        placeholder="votre commentaire ..."
        @input="resize($event)"
      ></textarea
      ><br />
      <div class="text-center">
        <mdb-btn class="btn" @click="addComments()">Envoyer</mdb-btn>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../../layouts/Navbarpro.vue";
import { mdbBtn } from "mdbvue";
import Footer from "../../layouts/Footer.vue";
export default {
  name: "Comments",
  components: {
    Navbarpro,
    Footer,
    mdbBtn
  },
  data() {
    return {
      comments: {
        comments: "",
        id_com: this.$store.state.tokenIdComment
      }
    };
  },
  methods: {
    async addComments() {
      const headers = {
        Authorization: `${this.$store.state.tokenPro}`
      };
      console.log(headers);
      await this.axios
        .post("http://localhost:8000/add-comments", this.comments, {
          headers: headers
        })
        .then(response => {
          console.log(response);
          let data = JSON.parse(response.config.data);
          console.log(data);
          this.$store.dispatch("recComment", data);
          this.$store.dispatch("addCommentId", data);
          this.comments.comments = "";
        })

        .catch(function(error) {
          console.log(error);
        }),
        alert("Commentaire ajouté avec succès");
    },
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    onReset(evt) {
      evt.preventDefault();
      this.comments.comments = "";
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
}</style>
