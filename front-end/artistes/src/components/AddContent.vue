<template>
  <div>
    <Navbar />
    <div class="container">
      <mdb-card>
        <mdb-card-body class="cards">
          <form @submit="addContent" @reset="onReset" @onChange="setChange">
            <div>
              <b-form-group label="Je post" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="content.content_type"
                  :options="options"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="black-text">
              <mdb-input
                v-model="content.title"
                value="content.title"
                label="Titre"
                icon="file-alt"
                name="title"
                type="text"
              />
              <mdb-input
                v-model="content.date"
                value="content.date"
                label="Date"
                icon="calendar-alt"
                name="date"
                type="date"
              />

              <mdb-input
                v-model="content.category"
                value="content.category"
                label="Catégorie"
                icon="music"
                name="category"
                type="text"
              />
              <mdb-input
                v-model="content.duration"
                value="content.duration"
                label="Durée"
                icon="stopwatch"
                name="duration"
                type="time"
              />

              <mdb-input
                v-model="content.content"
                value="content.content"
                label="Contenu"
                icon="hand-pointer"
                name="content"
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
    Footer,
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
        id_user_a: this.$store.state.tokenId,
      },
      selected: "first",
      options: [
        { text: "Chanson", value: "Chanson" },
        { text: "Texte", value: "Texte" },
        { text: "Composition", value: "Composition" },
      ],
    };
  },
  methods: {
    setChange(evt) {
      let myinput = evt.target;
      let inputname = myinput.name;
      let value = myinput.value;
      this.$store.dispatch({
        [inputname]: value,
      });
    },

    async addContent(evt) {
      evt.preventDefault();
      const headers = {
        Authorization: `${this.$store.state.token}`,
      };
      console.log(headers);
      await this.axios
        .post("http://localhost:8000/add-contents", this.content, {
          headers: headers,
        })

        .then((response) => {
          console.log(response);
          this.$store
            .dispatch("addContent", {
              content_type: "",
              title: "",
              date: "",
              category: "",
              duration: "",
              content: "",
              id_user_a: "",
            })

            .catch(function(error) {
              console.log(error);
            }),
            alert("Contenu ajouté avec succès");
        });
    },

    beforeMount() {
      console.log(this.AllContent);
      this.axios
        .get(`http://localhost:8000/contents/${this.$store.state.tokenId}`)
        .then((response) => {
          console.log(response.data);
          this.$store.dispatch("decodeTokenId", response.data.id_user_a),
            this.$store.dispatch("recContent", response.data.id_a);
        });
    },

    onReset(evt) {
      evt.preventDefault();
      this.content.content_type = "";
      this.content.title = "";
      this.content.date = "";
      this.content.category = "";
      this.content.duration = "";
      this.content.content = "";
      this.content.id_user_a = "";
    },
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  width: 100%;
}
</style>
