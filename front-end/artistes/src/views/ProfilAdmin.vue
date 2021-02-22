<template>
  <div>
    <NavbarAdminProfil />
    <div class="container">
      <br /><br />
      <h3>Bienvenue {{ TokenName }}</h3>
      <br />
      <p>Modifie tes données via ce formulaire ci-dessous.</p>
      <mdb-card>
        <mdb-card-body class="cards">
          <form>
            <div class="black-text">
              <mdb-input
                v-model="admin.name"
                label="Nom"
                icon="user"
                value="admin.name"
                type="text"
              />
              <mdb-input
                v-model="admin.first_name"
                label="Prénom"
                icon="user"
                value="admin.first_name"
                type="text"
              />
              <mdb-input
                v-model="admin.email"
                label="email"
                icon="envelope"
                value="admin.email"
                type="email"
              />
              <mdb-input
                v-model="admin.password"
                label="Mot de passe"
                icon="lock"
                value="admin.password"
                type="password"
              />
              <mdb-input
                v-model="admin.picture_profil_a"
                label="Photo de profil"
                icon="image"
                value="admin.picture_profil_a"
                type="text"
              />
            </div>
            <div class="text-center">
              <mdb-btn class="btn" @click="Update()">Modifier</mdb-btn>
            </div>
            <br /><br />
            <p>Supprime définitivement ton compte en cliquant sur le bouton.</p>
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
import NavbarAdminProfil from "../layouts/NavbarAdminProfil.vue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";

export default {
  name: "ProfilAdmin",
  components: {
    Footer,
    NavbarAdminProfil,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody
  },

  computed: { ...mapGetters(["TokenName", "AllContent", "AllUsers"]) },

  data() {
    return {
      admin: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        picture_profil_a: "",
        id_admin: this.$store.state.tokenIdAdmin
      }
    };
  },
  methods: {
    async Update() {
      try {
        let adminData = this.admin;
        console.log(adminData);
        for (let key in adminData) {
          if (adminData[key] === "") {
            delete adminData[key];
          }
        }
        if (adminData) {
          let result = await this.axios.put(
            `http://localhost:8000/admin/${this.$store.state.tokenIdAdmin}`,
            adminData
          );
          console.log(result);
          if (result.status === 200) {
            alert("Vos données ont été modifiées avec succès");
            this.$store.dispatch(
              adminData,
              "updateAdmin",
              result.data.tokenIdAdmin
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    Delete() {
      this.axios
        .delete(`http://localhost:8000/admin/${this.$store.state.tokenIdAdmin}`)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.$store.dispatch("deleteToken", response.data.tokenIdAdmin);
            this.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
