<template>
  <div>
    <Navbarpro />
    <div class="container">
      <mdb-card>
        <mdb-card-body class="cards">
          <form>
            <div class="black-text">
              <mdb-input label="Nom" icon="user" type="text" />
              <mdb-input label="Prénom" icon="user" type="text" />
              <mdb-input label="email" icon="envelope" type="email" />
              <mdb-input label="Mot de passe" icon="lock" type="password" />
                <mdb-input label="Nom de l'entreprise" icon="user" type="text" />
              <mdb-input label="Photo" icon="image" type="text" />
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
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../layouts/Navbarpro.vue";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import Footer from "../layouts/Footer.vue";

export default {
  name: "Profil_pro",
  components: {
    Navbarpro,
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
        picture: "",
      },
    };
  },
  methods: {
    Delete() {
      
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