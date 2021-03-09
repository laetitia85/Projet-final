<template>
  <div>
    <NavbarAdminProfil />
    <div class="contain">
      <br />
      <h2>Artistes</h2>
      <table class="tabUsers" hover>
        <colgroup>
          <col span="6" class="info" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <!-- <th>Modifier</th> -->
            <th>Supprimer</th>
          </tr>
        </thead>

        <tr class="tab" v-for="user in AllUsers" :key="user.id_a">
          <td>{{ user.id_a }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.email }}</td>
          <!-- <th>
            <mdb-btn color="success" icon="edit" size="sm"></mdb-btn>
          </th> -->
          <th>
            <mdb-btn
              color="danger"
              icon="trash-alt"
              size="sm"
              @click="Delete(user.id_a)"
              >Supprimer</mdb-btn
            >
          </th>
        </tr>
      </table>

      <br /><br /><br />
      <h2>Professionnels</h2>
      <table class="tabUsers">
        <colgroup>
          <col span="6" class="info" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <!-- <th>Modifier</th> -->
            <th>Supprimer</th>
          </tr>
        </thead>

        <tr class="tab" v-for="userPro in AllUsersPro" :key="userPro.id_p">
          <td>{{ userPro.id_p }}</td>
          <td>{{ userPro.name }}</td>
          <td>{{ userPro.first_name }}</td>
          <td>{{ userPro.email }}</td>
          <!-- <th>
            <mdb-btn color="success" icon="edit" size="sm">Modifier</mdb-btn>
          </th> -->
          <th>
            <mdb-btn
              color="danger"
              icon="trash-alt"
              size="sm"
              @click="DeletePro(userPro.id_p)"
              >Supprimer</mdb-btn
            >
          </th>
        </tr>
      </table>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarAdminProfil from "../../layouts/NavbarAdminProfil.vue";
import { mapGetters } from "vuex";
import Footer from "../../layouts/Footer.vue";
import { mdbBtn } from "mdbvue";

export default {
  name: "Users",
  components: {
    Footer,
    NavbarAdminProfil,
    mdbBtn
  },
  data() {
    return {
      user: {
        name: "",
        first_name: "",
        email: "",
        password: "",
        picture_profil: "",
        id_a: this.$store.state.users.id_a
      },
      userPro: {
        name: "",
        first_name: "",
        email: ""
      }
    };
  },

  computed: { ...mapGetters(["AllUsers", "AllUsersPro"]) },

  methods: {
    Delete(id) {
      console.log(id);
      let res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
        this.axios
          .delete(`http://localhost:8000/adminA/${id}`)
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              this.$store.dispatch("deleteUsers", id);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    DeletePro(idPro) {
      console.log(idPro);
      let res = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?");
      if (res) {
        this.axios
          .delete(`http://localhost:8000/adminP/${idPro}`)
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              this.$store.dispatch("deleteUsersPro", idPro);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.contain {
  background-color: rgb(64, 224, 208, 0.25);
  padding-right: 20px;
  padding-left: 20px;
  margin: 0;
  width: 100%;
  min-height: 80vh;
  padding-bottom: 30px;
}
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid rgb(6, 79, 197);
  padding: 10px;
}
.info {
  background-color: aqua;
}
.tab {
  background-color: white !important;
}
.tabUsers {
  position: relative;
  left: 350px;
}
</style>
