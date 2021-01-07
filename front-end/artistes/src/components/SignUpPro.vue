<template>
  <div>
    <NavBarSignUpPro />
    <div class="container">
      <mdb-card>
        <mdb-card-body class="bgcolorform">
          <form
            @input.prevent="handleSubmit"
            @submit="onSubmit"
            @reset="onReset"
            @onChange="setChange"
          >
            <p v-if="lol == true">
              Vous etes enregistrer ! Vous pouvez vous connecter
            </p>

            <div>
              <b-form-group label="Je suis" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="userPro.pro_type"
                  :options="options"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="black-text">
              <mdb-input
                label="Nom"
                type="text"
                icon="user"
                v-model="userPro.name"
                id="name"
                name="name"
                @input="$v.userPro.name.$touch()"
                :class="{ 'is-invalid': submitted && $v.userPro.name.$error }"
              />
              <div
                v-if="submitted && !$v.userPro.name.required"
                class="invalid-feedback"
              >
                Le nom est requis
                <span v-if="!$v.userPro.name.minLength"
                  >Le nom doit contenir au moins 2 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Prénom"
                type="text"
                icon="user"
                v-model="userPro.first_name"
                id="first_name"
                name="first_name"
                @input="$v.userPro.first_name.$touch()"
                :class="{
                  'is-invalid': submitted && $v.userPro.first_name.$error,
                }"
              />
              <div
                v-if="submitted && !$v.userPro.first_name.required"
                class="invalid-feedback"
              >
                Le prénom est requis
                <span v-if="!$v.userPro.first_name.minLength"
                  >Le prénom doit contenir au moins 3 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Email"
                type="email"
                icon="at"
                v-model="userPro.email"
                id="email"
                name="email"
                :class="{ 'is-invalid': submitted && $v.userPro.email.$error }"
              />
              <div
                v-if="submitted && $v.userPro.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.userPro.email.required">Email requis</span>
                <span v-if="!$v.userPro.email.email">Email invalide</span>
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Mot de passe"
                type="password"
                icon="lock"
                v-model="userPro.password"
                id="password"
                name="password"
                :class="{
                  'is-invalid': submitted && $v.userPro.password.$error,
                }"
              />
              <div
                v-if="submitted && $v.userPro.password.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.userPro.password.required"
                  >Mot de passe requis</span
                >
                <span v-if="!$v.userPro.password.minLength"
                  >Le mot de passe doit contenir au minimum 6 caractères</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Confirmer le mot de passe"
                type="password"
                icon="exclamation-triangle"
                v-model="userPro.passwordcheck"
                id="passwordcheck"
                name="passwordcheck"
                :class="{
                  'is-invalid': submitted && $v.userPro.passwordcheck.$error,
                }"
              />
              <div
                v-if="submitted && $v.userPro.passwordcheck.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.userPro.passwordcheck.required"
                  >Confirmation du mot de passe requis</span
                >
                <span v-if="!$v.userPro.passwordcheck.sameAsPassword"
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
                label="Nom de l'entreprise"
                type="text"
                icon="signature"
                v-model="userPro.enterprise_name"
                id="enterprise_name"
                name="enterprise_name"
                @input="$v.userPro.enterprise_name.$touch()"
                :class="{
                  'is-invalid': submitted && $v.userPro.enterprise_name.$error,
                }"
              />
              <div
                v-if="submitted && !$v.userPro.enterprise_name.required"
                class="invalid-feedback"
              >
                Le nom de l'entreprise est requis
                <span v-if="!$v.userPro.enterprise_name.minLength"
                  >Le nom de l'entreprise doit contenir au moins 3 lettres</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Numéro de siret"
                type="password"
                icon="lock"
                v-model="userPro.siret_number"
                id="siret_number"
                name="siret_number"
                :class="{
                  'is-invalid': submitted && $v.userPro.siret_number.$error,
                }"
              />
              <div
                v-if="submitted && $v.userPro.siret_number.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.userPro.siret_number.required"
                  >Numéro de siret requis</span
                >
                <span v-if="!$v.userPro.siret_number.minLength"
                  >Le numéro de siret doit contenir au minimum 6
                  caractères</span
                >
              </div>
            </div>

            <div class="black-text">
              <mdb-input
                label="Photo"
                type="text"
                icon="image"
                v-model="userPro.picture"
                id="pictureprofil"
                name="picture_profil"
                @input="$v.userPro.picture.$touch()"
                :class="{
                  'is-invalid': submitted && $v.userPro.picture.$error,
                }"
              />
              <div
                v-if="submitted && !$v.userPro.picture.required"
                class="invalid-feedback"
              >
                Photo de profil requise
                <span v-if="!$v.userPro.picture.minLength"
                  >Merci de fournir une photo ou une image</span
                >
              </div>
            </div>
            <div class="text-center py-4 mt-3">
              <mdb-btn type="submit" @submit="onSubmit">S'inscrire</mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBarSignUpPro from "../layouts/NavBarSignUpPro";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Footer from "../layouts/Footer";

export default {
  name: "SignUpPro",
  components: {
    NavBarSignUpPro,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    Footer,
  },

  data() {
    return {
      userPro: {
        pro_type: "",
        name: "",
        first_name: "",
        email: "",
        password: "",
        passwordcheck: "",
        enterprise_name: "",
        siret_number: "",
        picture: "",
        id_p: this.$store.state.tokenIdPro,
      },
      selected: "first",
      options: [
        { text: "Une maison de disque", value: "une maison de disque" },
        { text: "Un indépendant", value: "un indépendant" },
      ],
      submitted: false,
      lol: false,
    };
  },
  validations: {
    userPro: {
      name: { required, minLength: minLength(2) },
      first_name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      passwordcheck: { required, sameAsPassword: sameAs("password") },
      enterprise_name: { required, minLength: minLength(3) },
      siret_number: { required, minLength: minLength(6) },
      picture: { required, minLength: minLength(6) },
    },
  },
  methods: {
       setChange(event) {
      let myinput = event.target;
      let inputname = myinput.name;
      let value = myinput.value;
      this.$store.dispatch({
        [inputname]: value
      });
    },

    async onSubmit(evt) {
      // console.log("lol");
      evt.preventDefault();
      await this.axios
        .post("http://localhost:8000/usersPro/sign-up-pro", this.userPro)
        .then((response) => {
          console.log(response);
            this.$store.dispatch("addUsersPro", {
            pro_type: "",
            name: "",
            first_name: "",
            email: "",
            password: "",
            enterprise_name: "",
            siret_number: "",
            picture: "",
            id_p: "",
          });
          this.lol = true;
          alert("Vous etes enregistrer! vous pouvez vous connecter");
          this.$router.push("/sign-in-pro");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      // this.userPro.pro_type = "";
      this.userPro.name = "";
      this.userPro.first_name = "";
      this.userPro.email = "";
      this.userPro.password = "";
      this.userPro.passwordcheck = "";
      this.userPro.enterprise_name = "";
      this.userPro.siret_number = "";
      this.userPro.picture = "";
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
    },
  },
};
</script>

<style>
.bgcolorform {
  background-color: #41d1cc;
}
.container {
  background-color: rgb(64, 224, 208, 0.25);
}
.black-text label {
  color: #000000 !important;
}
</style>
