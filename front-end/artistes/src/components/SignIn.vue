<template>
  <div class="container">
    <NavBarSignIn />
    <mdb-card>
      <mdb-card-body class="bgcolorform">
        <form @submit="onSubmit" @reset="onReset">
          <div class="black-text">
            <mdb-input
              label="Email"
              icon="envelope"
              type="email"
              v-model="form.email"
              required
              description="Ne donner jamais votre mot de passe."
            />
            <mdb-input
              label="Mot de passe"
              icon="lock"
              type="password"
              v-model="form.password"
              required
              description="Entrer votre mot de passe"
            />
          </div>
          <div class="text-center">
            <mdb-btn type="submit">Se connecter</mdb-btn>
          </div>
        </form>
      </mdb-card-body>
      <Footer />
    </mdb-card>
  </div>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import Footer from "../layouts/Footer";
import NavBarSignIn from "../layouts/NavBarSignIn";

export default {
  name: "SignIn",
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer,
    NavBarSignIn
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    parseJwt(token) {
      console.log(token);

      let f = JSON.parse(atob(token.split(".")[1]));
      console.log(f);
      return f;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.axios
        .post("http://localhost:8000/users/sign-in", this.form)
        .then((response) => {
          console.log(response);
          this.$store.dispatch("token", response.data.token);
          let jwt = this.parseJwt(response.data.token);
          console.log(response.data.token);

          this.$store.dispatch("decodeToken", jwt.name);
          this.$store.dispatch("decodeTokenId", jwt.id);
          this.axios
            .get(
              `http://localhost:8000/add-contents/${this.$store.state.tokenId}`
            )
            .then((response) => {
              this.$store.dispatch("recContent", response.data);
            });
          // console.log(jwt.name);
          // alert(JSON.stringify(this.form));
          this.$router.push("/profil");
        })
        .catch(function(error) {
          alert("Cet utilisateur nexiste pas");
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
    },
  },
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
