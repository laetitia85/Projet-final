<template>
  <div>
    <NavbarAdminProfil />
    <div class="container">
      <table>
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
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>

        <tr class="tab" v-for="user in AllUsers" :key="user.id_a">
          <td>{{ user.id_a }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.email }}</td>
          <th>
            <mdb-btn color="success" icon="edit" size="sm">Modifier</mdb-btn>
          </th>
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
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarAdminProfil from "../layouts/NavbarAdminProfil.vue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";
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
      }
    };
  },

  computed: { ...mapGetters(["AllUsers"]) },

  methods: {
    Delete(id) {
      console.log(id);
      this.axios
        .delete(`http://localhost:8000/adminA/${id}`)
        .then(response => {
          console.log(response);
          console.log(this.$store.state.users);
          if (response.status === 200) {
            this.$store.dispatch("deleteUsers", id);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  // async mounted() {
  //   try {
  //     this.axios.get("http://localhost:8000/users").then((result) => {
  //       console.log(result.data);
  //       this.$store.dispatch("recUsers", result.data);
  //       this.$store.dispatch("deleteToken", result.data.id_a);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
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
</style>
