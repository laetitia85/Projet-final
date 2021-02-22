<template>
  <div>
    <NavBarSignUp />
    <div class="container">
      <br /><br />
      <mdb-card>
        <mdb-card-body class="bgcolorform">
          <form
            @input.prevent="handleSubmit"
            @submit="onSubmit"
            @reset="onReset"
            @onChange="setChange"
          >
            <!-- <p v-if="lol == true">
              Vous etes enregistrer ! Vous pouvez vous connecter
            </p> -->

            <div class="black-text">
              <mdb-input
                label="Nom"
                type="text"
                icon="user"
                v-model="user.name"
                value="user.name"
                id="name"
                name="name"
                @input="$v.user.name.$touch()"
                :class="{ 'is-invalid': submitted && $v.user.name.$error }"
              />
              <div
                v-if="submitted && !$v.user.name.required"
                class="invalid-feedback"
              >
                Le nom est requis
                <span v-if="!$v.user.name.minLength"
                  >Le nom doit contenir au moins 2 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Prénom"
                type="text"
                icon="user"
                v-model="user.first_name"
                value="user.first_name"
                id="first_name"
                name="first_name"
                @input="$v.user.first_name.$touch()"
                :class="{
                  'is-invalid': submitted && $v.user.first_name.$error
                }"
              />
              <div
                v-if="submitted && !$v.user.first_name.required"
                class="invalid-feedback"
              >
                Le prénom est requis
                <span v-if="!$v.user.first_name.minLength"
                  >Le prénom doit contenir au moins 3 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Email"
                type="email"
                icon="at"
                v-model="user.email"
                value="user.email"
                id="email"
                name="email"
                :class="{ 'is-invalid': submitted && $v.user.email.$error }"
              />
              <div
                v-if="submitted && $v.user.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.email.required">Email requis</span>
                <span v-if="!$v.user.email.email">Email invalide</span>
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Mot de passe"
                type="password"
                icon="lock"
                v-model="user.password"
                value="user.password"
                id="password"
                name="password"
                :class="{
                  'is-invalid': submitted && $v.user.password.$error
                }"
              />
              <div
                v-if="submitted && $v.user.password.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.password.required"
                  >Mot de passe requis</span
                >
                <span v-if="!$v.user.password.minLength"
                  >Le mot de passe doit contenir au minimum 8 caractères</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Confirmer le mot de passe"
                type="password"
                icon="exclamation-triangle"
                v-model="user.passwordcheck"
                value="user.passwordcheck"
                id="passwordcheck"
                name="passwordcheck"
                :class="{
                  'is-invalid': submitted && $v.user.passwordcheck.$error
                }"
              />
              <div
                v-if="submitted && $v.user.passwordcheck.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.passwordcheck.required"
                  >Le mot de passe est requis</span
                >
                <span v-if="!$v.user.passwordcheck.sameAsPassword"
                  >Vous devez fournir le meme mot de passe.</span
                >
                <span
                  :data="$v"
                  :options="{ rootObjectKey: '$v', maxDepth: 2 }"
                ></span>
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Photo de profil"
                type="text"
                icon="image"
                v-model="user.picture_profil"
                value="user.picture_profil"
                id="pictureprofil"
                name="picture_profil"
                @input="$v.user.picture_profil.$touch()"
                :class="{
                  'is-invalid': submitted && $v.user.picture_profil.$error
                }"
              />
              <div
                v-if="submitted && !$v.user.picture_profil.required"
                class="invalid-feedback"
              >
                Photo de profil requise
                <span v-if="!$v.user.picture_profil.minLength"
                  >Merci de fournir une photo de profil ou une image</span
                >
              </div>
            </div>
            <div class="text-center py-4 mt-3">
              <mdb-btn type="submit" @click="onSubmit">S'inscrire</mdb-btn>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Footer from "../../layouts/Footer";
import NavBarSignUp from "../../layouts/NavBarSignUp";

export default {
  name: "SignUp",
  components: {
    NavBarSignUp,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer
  },

  data() {
    return {
      user: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        passwordcheck: "",
        picture_profil: "",
        id_a: this.$store.state.tokenId
      },
      submitted: false
      // lol: false
    };
  },
  validations: {
    user: {
      name: { required, minLength: minLength(2) },
      first_name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      passwordcheck: { required, sameAsPassword: sameAs("password") },
      picture_profil: { required, minLength: minLength(6) }
    }
  },
  methods: {
    setChange(evt) {
      let myinput = evt.target;
      let inputname = myinput.name;
      let value = myinput.value;
      this.$store.dispatch({
        [inputname]: value
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      // console.log("lol");
      this.axios
        .post("http://localhost:8000/users/sign-up", this.user)
        .then(response => {
          console.log(response);
          this.$store.dispatch("recUsers", {
            name: "",
            first_name: "",
            email: "",
            password: "",
            picture_profil: "",
            id_a: ""
          });
          // this.lol = true;
          alert("Vous etes enregistrer! vous pouvez vous connecter");
          this.$router.push("/sign-in");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.user.name = "";
      this.user.first_name = "";
      this.user.email = "";
      this.user.password = "";
      this.user.passwordcheck = "";
      this.user.picture_profil = "";
      this.$v.$reset();
    },
    handleSubmit(e) {
      console.log(e);
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      alert("Tout les champs sont remplis! Vous pouvez vous inscrire.");
    }
  }
};
</script>

<style scoped>
.bgcolorform {
  background-color: #41d1cc;
}
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
}
.black-text label {
  color: #000000 !important;
}
.btn {
  background-image: url("../../images/bgcolor bouton.jpg");
  background-size: 100%;
  text-shadow: 1px 1px 2px black;
}
</style>
