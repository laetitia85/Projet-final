<template>
  <div>
    <Navbar />
    <div class="container">
      <mdb-card class="bgcolorform">
        <mdb-card-body class="bgimg">
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
                name="title"
                type="text"
              />
              <mdb-input
                v-model="content.date"
                value="content.date"
                label="Date"
                name="date"
                type="date"
              />

              <mdb-input
                v-model="content.category"
                value="content.category"
                label="Catégorie"
                name="category"
                type="text"
              />
              <mdb-input
                v-model="content.duration"
                value="content.duration"
                label="Durée"
                name="duration"
                type="time"
              />

              <mdb-input
                v-model="content.content"
                value="content.content"
                label="Contenu"
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
import Navbar from "../../layouts/Navbar.vue";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import Footer from "../../layouts/Footer.vue";

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
        content_type: "",
        title: "",
        date: "",
        category: "",
        duration: "",
        content: "",
        id_user_a: this.$store.state.tokenId,
        id_c: this.$store.state.tokenIdContent
      },
      selected: "first",
      options: [
        { text: "Chanson", value: "Chanson" },
        { text: "Texte", value: "Texte" },
        { text: "Composition", value: "Composition" }
      ]
    };
  },

  // beforeMount() {
  //   this.axios
  //     .get(`http://localhost:8000/contents/${this.$store.state.tokenId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       this.$store.dispatch("decodeTokenId", response.data.id_user_a),
  //         this.$store.dispatch("recContentId", response.data.id_c);
  //     });
  // }
  methods: {
    setChange(evt) {
      let myinput = evt.target;
      let inputname = myinput.name;
      let value = myinput.value;
      this.$store.dispatch({
        [inputname]: value
      });
    },

    async addContent(evt) {
      evt.preventDefault();
      const headers = {
        Authorization: `${this.$store.state.token}`
      };
      console.log(headers);
      await this.axios
        .post("http://localhost:8000/add-contents", this.content, {
          headers: headers
        })

        .then(response => {
          console.log(response);
          this.$store
            .dispatch("recContent", "addContentId", response.config.data, {
              content_type: "",
              title: "",
              date: "",
              category: "",
              duration: "",
              content: "",
              id_user_a: "",
              id_c: ""
            })

            .catch(function(error) {
              console.log(error);
            }),
            alert("Contenu ajouté avec succès");
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
      // this.content.id_user_a = "";
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
}
.btn {
  background-image: url("../../images/bgcolor bouton.jpg");
  background-size: 100%;
  text-shadow: 1px 1px 2px black;
}
.bgcolorform {
  background-color: #f5f5f5;
}
.bgimg {
  background-image: url("../../images/photo création.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
  background-position: center;
}
</style>
