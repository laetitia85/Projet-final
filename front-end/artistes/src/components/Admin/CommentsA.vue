<template>
  <div>
    <NavbarAdminProfil />
    <div class="contain">
      <br />
      <h2>Commentaires</h2>
      <table class="tabPosts">
        <colgroup>
          <col span="8" class="info" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Id</th>
            <th>Commentaires</th>
            <!-- <th>Modifier</th> -->
            <th>Supprimer</th>
          </tr>
        </thead>

        <tr class="tab" v-for="comment in AllComment" :key="comment.id_com">
          <td>{{ comment.id_com }}</td>
          <td>{{ comment.comment }}</td>
          <!-- <th>
            <mdb-btn color="success" icon="edit" size="sm">Modifier</mdb-btn>
          </th> -->
          <th>
            <mdb-btn
              color="danger"
              icon="trash-alt"
              size="sm"
              @click="Delete(comment.id_com)"
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
  name: "CommentsA",
  components: {
    Footer,
    NavbarAdminProfil,
    mdbBtn
  },

  data() {
    return {
      comment: {
        comment: "",
        id_com: this.$store.state.tokenIdComment
      }
    };
  },

  computed: { ...mapGetters(["AllComment"]) },

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
        .delete(`http://localhost:8000/adminCom/${id}`)
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            this.$store.dispatch("deleteComments", id);
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
.contain {
  background-color: rgb(64, 224, 208, 0.25);
  padding-right: 20px;
  padding-left: 20px;
  margin: 0;
  width: 100%;
  min-height: 75vh;
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
  left: 100px;
}
</style>