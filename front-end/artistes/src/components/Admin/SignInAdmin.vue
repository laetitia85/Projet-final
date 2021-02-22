<template>
  <div>
    <NavbarAdmin />
    <div class="container">
      <br /><br />
      <mdb-card>
        <mdb-card-body class="bgcolorform">
          <form @submit="onSubmit" @reset="onReset">
            <div class="black-text">
              <mdb-input
                label="Email"
                icon="at"
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
import Footer from "../../layouts/Footer";
import NavbarAdmin from "../../layouts/NavbarAdmin";

export default {
  name: "SignInAdmin",
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer,
    NavbarAdmin
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
    parseJwtAdmin(tokenAdmin) {
      console.log(tokenAdmin);
      let base64Url = tokenAdmin.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    },

    onSubmit(evt) {
      evt.preventDefault();
      this.axios
        .post("http://localhost:8000/admin/sign-in", this.form)
        .then(response => {
          console.log(response);
          this.$store.dispatch("tokenAdmin", response.data.tokenAdmin);
          let jwtAdmin = this.parseJwtAdmin(response.data.tokenAdmin);
          console.log(jwtAdmin);

          this.$store.dispatch(
            "decodeTokenAdmin",
            jwtAdmin.first_name,
            jwtAdmin.picture_profil_a
          );
          this.$store.dispatch("decodeTokenIdAdmin", jwtAdmin.id_admin);
          this.axios.get("http://localhost:8000/users").then(result => {
            console.log(result.data);
            this.$store.dispatch("recUsers", result.data);

            this.axios.get("http://localhost:8000/usersPro").then(result => {
              console.log(result.data);
              this.$store.dispatch("recUsersPro", result.data);

              this.axios
                .get("http://localhost:8000/contents")
                .then(resultat => {
                  console.log(resultat.data);
                  this.$store.dispatch("recContent", resultat.data);
                  // this.$store.dispatch("recContentId", resultat.data.id_c);
                });
            });
          });
          this.$router.push("/profil-admin");
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
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
}
.bgcolorform {
  background-color: #41d1cc;
}
.black-text label {
  color: #000000 !important;
}
.btn {
  background-image: url("../../images/bgcolor bouton.jpg");
  background-size: 100%;
  text-shadow: 1px 1px 2px black;
}
mr-auto {
  margin: 0;
}
</style>
