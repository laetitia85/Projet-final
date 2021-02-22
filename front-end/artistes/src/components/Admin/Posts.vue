<template>
  <div>
    <NavbarAdminProfil />
    <div class="container">
      <br />
      <h2>Posts</h2>
      <table class="tabPosts">
        <colgroup>
          <col span="8" class="info" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titre</th>
            <th>Date</th>
            <th>Catégory</th>
            <th>Durée</th>
            <th>Type de contenu</th>
            <!-- <th>Modifier</th> -->
            <th>Supprimer</th>
          </tr>
        </thead>

        <tr class="tab" v-for="content in AllContent" :key="content.id_c">
          <td>{{ content.id_c }}</td>
          <td>{{ content.title }}</td>
          <td>{{ content.date }}</td>
          <td>{{ content.category }}</td>
          <td>{{ content.duration }}</td>
          <td>{{ content.content_type }}</td>
          <!-- <th>
            <mdb-btn color="success" icon="edit" size="sm">Modifier</mdb-btn>
          </th> -->
          <th>
            <mdb-btn
              color="danger"
              icon="trash-alt"
              size="sm"
              @click="Delete(content.id_c)"
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
  name: "ProfilAdmin",
  components: {
    Footer,
    NavbarAdminProfil,
    mdbBtn
  },

  data() {
    return {
      content: {
        content_type: "",
        title: "",
        date: "",
        category: "",
        duration: "",
        content: "",
        id_c: this.$store.state.tokenIdContent
      }
    };
  },

  computed: { ...mapGetters(["AllContent"]) },

  // async mounted() {
  //   try {
  //     await this.axios.get("http://localhost:8000/contents").then((result) => {
  //       console.log(result.data);
  //       this.$store.dispatch("recContent", result.data);
  //       this.$store.dispatch("deleteToken", result.data.id_c);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  methods: {
    Delete(id) {
      this.axios
        .delete(`http://localhost:8000/adminC/${id}`)
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            this.$store.dispatch("deletePosts", id);
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
.tabPosts {
  position: relative;
  left: 100px;
}
</style>
