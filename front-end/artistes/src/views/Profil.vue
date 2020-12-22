<template>
  <div>
    <Navbar />

    <mdb-card>
      <mdb-card-body>
        <form>
          <div class="grey-text">
            <mdb-input label="Nom" icon="user" type="text" />
            <mdb-input label="Prénom" icon="user" type="text" />
            <mdb-input label="Your email" icon="envelope" type="email" />
            <mdb-input label="Your password" icon="lock" type="password" />
            <mdb-input label="Photo de profil" icon="image" type="text" />
          </div>
          <div class="text-center">
            <mdb-btn class="btn">Modifier</mdb-btn>
          </div>
          <div class="text-center">
            <mdb-btn class="btn">Supprimer</mdb-btn>
          </div>
        </form>
      </mdb-card-body>
    </mdb-card>

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
      },
    };
  },
};
</script>
