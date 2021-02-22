<template>
  <div>
    <NavbarAdmin />
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
                v-model="admin.name"
                value="admin.name"
                id="name"
                name="name"
                @input="$v.admin.name.$touch()"
                :class="{ 'is-invalid': submitted && $v.admin.name.$error }"
              />
              <div
                v-if="submitted && !$v.admin.name.required"
                class="invalid-feedback"
              >
                Le nom est requis
                <span v-if="!$v.admin.name.minLength"
                  >Le nom doit contenir au moins 2 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Prénom"
                type="text"
                icon="user"
                v-model="admin.first_name"
                value="admin.first_name"
                id="first_name"
                name="first_name"
                @input="$v.admin.first_name.$touch()"
                :class="{
                  'is-invalid': submitted && $v.admin.first_name.$error
                }"
              />
              <div
                v-if="submitted && !$v.admin.first_name.required"
                class="invalid-feedback"
              >
                Le prénom est requis
                <span v-if="!$v.admin.first_name.minLength"
                  >Le prénom doit contenir au moins 3 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Email"
                type="email"
                icon="at"
                v-model="admin.email"
                value="admin.email"
                id="email"
                name="email"
                :class="{ 'is-invalid': submitted && $v.admin.email.$error }"
              />
              <div
                v-if="submitted && $v.admin.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.admin.email.required">Email requis</span>
                <span v-if="!$v.admin.email.email">Email invalide</span>
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Mot de passe"
                type="password"
                icon="lock"
                v-model="admin.password"
                value="admin.password"
                id="password"
                name="password"
                :class="{
                  'is-invalid': submitted && $v.admin.password.$error,
                }"
              />
              <div
                v-if="submitted && $v.admin.password.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.admin.password.required"
                  >Mot de passe requis</span
                >
                <span v-if="!$v.admin.password.minLength"
                  >Le mot de passe doit contenir au minimum 8 caractères</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Confirmer le mot de passe"
                type="password"
                icon="exclamation-triangle"
                v-model="admin.passwordcheck"
                value="admin.passwordcheck"
                id="passwordcheck"
                name="passwordcheck"
                :class="{
                  'is-invalid': submitted && $v.admin.passwordcheck.$error
                }"
              />
              <div
                v-if="submitted && $v.admin.passwordcheck.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.admin.passwordcheck.required"
                  >Le mot de passe est requis</span
                >
                <span v-if="!$v.admin.passwordcheck.sameAsPassword"
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
                v-model="admin.picture_profil_a"
                value="admin.picture_profil_a"
                id="pictureprofil"
                name="picture_profil"
                @input="$v.admin.picture_profil_a.$touch()"
                :class="{
                  'is-invalid': submitted && $v.admin.picture_profil_a.$error
                }"
              />
              <div
                v-if="submitted && !$v.admin.picture_profil_a.required"
                class="invalid-feedback"
              >
                Photo de profil requise
                <span v-if="!$v.admin.picture_profil_a.minLength"
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
      <br><br>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Footer from "../../layouts/Footer";
import NavbarAdmin from "../../layouts/NavbarAdmin";


export default {
  name: "SignUp",
  components: {
    NavbarAdmin,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer
  },

  data() {
    return {
      admin: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        passwordcheck: "",
        picture_profil_a: "",
        id_admin: this.$store.state.tokenIdAdmin
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
      picture_profil_a: { required, minLength: minLength(6) }
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
        .post("http://localhost:8000/admin/sign-up", this.admin)
        .then(response => {
          console.log(response.data);
          this.$store.dispatch(
            "addAdmin",
            {
              name: "",
              first_name: "",
              email: "",
              password: "",
              picture_profil_a: "",
              id_admin: ""
            },
            response.data
          );
          // this.lol = true;
          alert("Vous etes enregistrer! vous pouvez vous connecter");
          this.$router.push("/sign-in-admin");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.admin.name = "";
      this.admin.first_name = "";
      this.admin.email = "";
      this.admin.password = "";
      this.admin.passwordcheck = "";
      this.admin.picture_profil_a = "";
      this.$v.$reset();
    },
    handleSubmit(e) {
      console.log(e);
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      alert("Tous les champs sont remplis! Vous pouvez vous inscrire.");
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
