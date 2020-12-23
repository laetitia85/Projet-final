<template>
  <div>
    <NavBarSignInPro />
    <div class="container">
      <mdb-card>
        <mdb-card-body class="bgcolorform">
          <form @submit="onSubmit" @reset="onReset">
            <div class="black-text">
              <mdb-input
                label="Email"
                icon="at"
                type="email"
                v-model="form_pro.email"
                required
                description="Ne donner jamais votre mot de passe."
              />
              <mdb-input
                label="Mot de passe"
                icon="lock"
                type="password"
                v-model="form_pro.password"
                required
                description="Entrer votre mot de passe"
              />
            </div>
            <div class="text-center">
              <mdb-btn type="submit" @submit="onSubmit">Se connecter</mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import Footer from "../layouts/Footer";
import NavBarSignInPro from "../layouts/NavBarSignInPro";

export default {
  name: "SignInPro",
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer,
    NavBarSignInPro,
  },
  data() {
    return {
      form_pro: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    parseJwt(tokenPro) {
      console.log(tokenPro);

      let f = JSON.parse(atob(tokenPro.split(".")[1]));
      console.log(f);
      return f;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.axios
        .post("http://localhost:8000/usersPro/sign-in-pro", this.form_pro)
        .then((response) => {
          console.log(response);
          this.$store.dispatch("tokenPro", response.data.tokenPro);
          let jwt = this.parseJwt(response.data.tokenPro);
          console.log(response.data.tokenPro);
          this.$store.dispatch("decodeTokenIdPro", jwt.id);
          this.$router.push("/profil-pro");
        })
        .catch(function(error) {
          alert("Cet utilisateur nexiste pas");
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form_pro.email = "";
      this.form_pro.password = "";
    }
  }
};
</script>

<style>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  width: 100%;
}
.bgcolorform {
  background-color: #41d1cc;
}
.black-text label {
  color: #000000 !important;
}
</style>
