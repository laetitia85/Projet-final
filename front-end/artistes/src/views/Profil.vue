<template>
  <div>
    <Navbar />
    <div class="container">
      <br /><br />
      <p>Bienvenue</p>
      <p>Ce formulaire te permet de modifier tes données.</p>
      <mdb-card>
        <mdb-card-body class="cards">
          <form>
            <div class="black-text">
              <mdb-input
                v-model="users.name"
                label="Nom"
                icon="user"
                value="users.name"
                type="text"
              />
              <mdb-input
                v-model="users.first_name"
                label="Prénom"
                icon="user"
                value="users.first_name"
                type="text"
              />
              <mdb-input
                v-model="users.email"
                label="email"
                icon="envelope"
                value="users.email"
                type="email"
              />
              <mdb-input
                v-model="users.password"
                label="Mot de passe"
                icon="lock"
                value="users.password"
                type="password"
              />
              <mdb-input
                v-model="users.picture_profil"
                label="Photo de profil"
                icon="image"
                value="users.picture_profil"
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
              <mdb-btn class="btn" @click="Delete(users.id_a)"
                >Supprimer</mdb-btn
              >
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
    </div>
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
    mdbCardBody
  },

  data() {
    return {
      users: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        picture_profil: "",
        id_a: this.$store.state.tokenId
      }
    };
  },
  methods: {
    async Update() {
      try {
        let usersData = this.users;
        console.log(usersData);
        for (let key in usersData) {
          if (usersData[key] === "") {
            delete usersData[key];
          }
        }
        if (usersData) {
          let result = await this.axios.put(
            `http://localhost:8000/users/${this.$store.state.tokenId}`,
            usersData
          );
          console.log(result);
          if (result.status === 200) {
            alert("Vos données ont été modifiées avec succès");
            this.$store.dispatch(usersData, "updateUsers", result.config.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    Delete(id) {
      this.axios
        .delete(`http://localhost:8000/users/${id}`)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.$store.dispatch("deleteToken", response.data.tokenId);
            this.axios
              .delete(`http://localhost:8000/contentsUser/${id}`)
              .then(response => {
                console.log(response);
                console.log(id);
                if (response.status === 200) {
                  this.$store.dispatch("deleteMyPosts", id);
                }
                alert("Le contenu à bien été supprimé");
              });
            this.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  //   Delete() {
  //     this.axios
  //       .delete(`http://localhost:8000/users/${this.$store.state.tokenId}`)
  //       .then(response => {
  //         console.log(response);
  //         if (response.status === 200) {
  //           this.$store.dispatch("deleteToken", response.data.tokenId);
  //           this.axios
  //             .delete(
  //               `http://localhost:8000/contents/${this.$store.state.tokenIdContent}`
  //             )
  //             .then(response => {
  //               console.log(response);
  //               console.log(this.$store.state.tokenIdContent);
  //               if (response.status === 200) {
  //                 this.$store.dispatch(
  //                   "deleteMyPosts",
  //                   response.data.tokenIdContent
  //                 );
  //               }
  //               alert("Le contenu à bien été supprimé");
  //             });
  //           this.$router.push("/");
  //         }
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   }
  // }
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
