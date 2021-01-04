<template>
  <div>
    <Navbarpro />
    <div class="container">
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
                v-model="formUpdate.enterprise_name"
                label="Nom de l'entreprise"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="formUpdate.picture"
                label="Photo"
                icon="image"
                type="text"
              />
            </div>
            <div class="text-center">
              <mdb-btn class="btn">Modifier</mdb-btn>
            </div>
            <div class="text-center">
              <mdb-btn class="btn" @click="Delete()">Supprimer</mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
      <ContentList />
      <div></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../layouts/Navbarpro.vue";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import Footer from "../layouts/Footer.vue";
import ContentList from "../components/ContentList.vue";

export default {
  name: "Profil_pro",
  components: {
    Navbarpro,
    Footer,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    ContentList
  },
  data() {
    return {
      formUpdate: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        enterprise_name: "",
        picture: "",
        id_p: this.$store.state.tokenIdPro
      },
    };
  },
  methods: {
    Delete() {
      this.axios
        .delete(`http://localhost:8000/usersPro/${this.$store.state.tokenIdPro}`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.$store.dispatch("deleteToken", response.data.tokenIdPro);
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
