<template>
  <div>
    <Navbarpro />
    <div class="container">
      <br />
      <h3>Bienvenue {{ TokenNamePro }}</h3>
      <br />
      <p>Ce formulaire te permet de modifier tes données.</p>
      <mdb-card>
        <mdb-card-body class="cards">
          <form>
            <div>
              <b-form-group label="Je suis" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="formUpdate.pro_type"
                  value="formUpdate.pro_type"
                  :options="options"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options"
                ></b-form-radio-group>
              </b-form-group>
            </div>

            <div class="black-text">
              <mdb-input
                v-model="formUpdate.name"
                value="formUpdate.name"
                label="Nom"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="formUpdate.first_name"
                value="formUpdate.first_name"
                label="Prénom"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="formUpdate.email"
                value="formUpdate.email"
                label="email"
                icon="envelope"
                type="email"
              />
              <mdb-input
                v-model="formUpdate.password"
                value="formUpdate.password"
                label="Mot de passe"
                icon="lock"
                type="password"
              />
              <mdb-input
                v-model="formUpdate.enterprise_name"
                value="formUpdate.enterprise_name"
                label="Nom de l'entreprise"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="formUpdate.picture"
                value="formUpdate.picture"
                label="Photo"
                icon="image"
                type="text"
              />
            </div>
            <div class="text-center">
              <mdb-btn class="btn" @click="Update()">Modifier</mdb-btn>
            </div>
            <br /><br />
            <p>
              Tu peux supprimer définitivement ton compte ainsi que toutes tes
              données en cliquant sur le bouton ci dessous
            </p>
            <div class="text-center">
              <mdb-btn class="btn" @click="Delete()">Supprimer</mdb-btn>
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
import Navbarpro from "../layouts/Navbarpro.vue";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";

export default {
  name: "Profil_pro",
  components: {
    Navbarpro,
    Footer,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody
  },

   computed: { ...mapGetters(["TokenNamePro"]) },

  data() {
    return {
      formUpdate: {
        pro_type: "",
        name: "",
        first_name: "",
        email: "",
        password: "",
        enterprise_name: "",
        picture: "",
        id_p: this.$store.state.tokenIdPro
      },
      selected: "first",
      options: [
        { text: "Une maison de disque", value: "une maison de disque" },
        { text: "Un indépendant", value: "un indépendant" }
      ]
    };
  },
  methods: {
    async Update() {
      try {
        let userProData = this.formUpdate;
        console.log(userProData);
        for (let key in userProData) {
          if (userProData[key] === "") {
            delete userProData[key];
          }
        }
        if (userProData) {
          let result = await this.axios.put(
            `http://localhost:8000/usersPro/${this.$store.state.tokenIdPro}`,
            userProData
          );
          console.log(result);
          if (result.status === 200) {
            alert("Vos données ont été modifiées avec succès");
            console.log("aaaaa");
            this.$store.dispatch(
              userProData,
              "updateUsersPro",
              result.data.tokenIdPro
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  Delete() {
    this.axios
      .delete(`http://localhost:8000/usersPro/${this.$store.state.tokenIdPro}`)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.$store.dispatch("deleteToken", response.data.tokenIdPro);
          this.$router.push("/");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
}
.cards {
  background-color: #41d1cc;
}
.btn {
  background-image: url("../images/bgcolor bouton.jpg");
  background-size: 100%;
  text-shadow: 1px 1px 2px black;
}
</style>
