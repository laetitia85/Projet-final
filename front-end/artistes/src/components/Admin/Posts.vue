<template>
  <div>
    <NavbarAdminProfil />
    <div class="contain">
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
            <th>Catégory</th>
            <th>Durée</th>
            <th>Type de contenu</th>
            <th>Id-user_a</th>
            <!-- <th>Modifier</th> -->
            <th>Supprimer</th>
          </tr>
        </thead>

        <tr class="tab" v-for="content in AllContent" :key="content.id_c">
          <td>{{ content.id_c }}</td>
          <td>{{ content.title }}</td>
          <td>{{ content.category }}</td>
          <td>{{ content.duration }}</td>
          <td>{{ content.content_type }}</td>
          <td>{{ content.id_user_a }}</td>
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
  name: "Posts",
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

  methods: {
    Delete(id) {
      let res = confirm("Êtes-vous sûr de vouloir supprimer ce contenu?");
      if (res) {
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
.tabPosts {
  position: relative;
  left: 200px;
}
</style>
