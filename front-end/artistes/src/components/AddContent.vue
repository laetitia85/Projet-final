<template>
  <div>
    <Navbar />
    <div class="container">
      <mdb-card>
        <mdb-card-body class="cards">
          <form @submit="addContent" @reset="onReset">
            <div class="black-text">
              <mdb-input
                v-model="content.title"
                label="Titre"
                icon="file-alt"
                type="text"
              />
              <mdb-input
                v-model="content.date"
                label="Date"
                icon="calendar-alt"
                type="date"
              />
              <mdb-input
                v-model="content.category"
                label="Catégorie"
                icon="music"
                type="text"
              />
              <mdb-input
                v-model="content.duration"
                label="Durée"
                icon="stopwatch"
                type="time"
              />
              <mdb-input
                v-model="content.content_type"
                label="Type de contenu"
                icon="hand-pointer"
                type="text"
              />
            </div>
            <div class="text-center">
              <mdb-btn
                type="submit"
                variant="primary"
                class="btn"
                @submit="addContent"
                >Ajouter</mdb-btn
              >
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../layouts/Navbar.vue";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import Footer from "../layouts/Footer.vue";

export default {
  name: "AddContent",
  components: {
    Navbar,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer
  },

  data() {
    return {
      content: {
        title: "",
        date: "",
        category: "",
        duration: "",
        content_type: "",
        id_user_a: this.$store.state.tokenId
      }
    };
  },
  methods: {
    addContent(evt) {
      evt.preventDefault();
      const headers = {
        Authorization: `${this.$store.state.token}`
      };
      console.log(headers);
      this.axios
        .post("http://localhost:8000/add-contents", this.content, {
          headers: headers
        })
        .then(
          this.$store
            .dispatch("addContent", {
              title: this.content.title,
              date: this.content.date,
              category: this.content.category,
              duration: this.content.duration,
              content_type: this.content.content_type,
              id_user_a: this.content.id_user_a
            })
            .catch(function(error) {
              console.log(error);
            })
        );
    },

    onReset(evt) {
      evt.preventDefault();
      this.content.title = "";
      this.content.date = "";
      this.content.category = "";
      this.content.duration = "";
      this.content.content_type = "";
      this.content.id_user_a = "";
    }
  }
};
</script>

<style scoped></style>
