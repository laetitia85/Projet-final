<template>
  <div>
    <Navbar />
    <div class="container">
      <br /><br />
      <mdb-card>
        <mdb-card-body class="cards">
          <form @click="Delete">
            <div class="black-text">
              <mdb-input
                v-model="formUpdate.name"
                label="Nom"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="formUpdate.first_name"
                label="Prénom"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="formUpdate.email"
                label="email"
                icon="envelope"
                type="email"
              />
              <mdb-input
                v-model="formUpdate.password"
                label="Mot de passe"
                icon="lock"
                type="password"
              />
              <mdb-input
                v-model="formUpdate.picture_profil"
                label="Photo de profil"
                icon="image"
                type="text"
              />
            </div>
            <div class="text-center">
              <mdb-btn class="btn" @click="Update()">Modifier</mdb-btn>
            </div>
            <div class="text-center">
              <mdb-btn class="btn" @click="Delete()">Supprimer</mdb-btn>
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
  name: "Profil",
  components: {
    Navbar,
    Footer,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
  },
  data() {
    return {
      formUpdate: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        picture_profil: "",
        id_a: this.$store.state.tokenId
      }
    };
  },
  methods: {
Update() {
  this.axios.put()
},


    Delete() {
      this.axios
        .delete(`http://localhost:8000/users/${this.$store.state.tokenId}`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.$store.dispatch("deleteToken", response.data.tokenId);
            this.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
}
.cards {
  background-color: #41d1cc;
}
</style>
