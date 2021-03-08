<template>
  <div>
    <Navbarpro />
    <div class="contain">
      <!-- <br />
      <label for="idselect">Choisir une categorie</label>
      <br /> -->
      <!-- <select
        class="select"
        id="idselect"
        @change="selectCategory(category)"
        v-model="category"
      >
        <option
          :value="category"
          v-for="category in CategoryTab[0]"
          :key="category.category"
        >
          {{ category }}
        </option>
      </select> -->
      <br /><br />
      <div v-for="content in AllContent" :key="content.id_c">
        <iframe :src="content.content" width="320" height="240" controls />
        <p><strong>Contenu:</strong> {{ content.content_type }}</p>
        <p><strong>Titre:</strong> {{ content.title }}</p>
        <p><strong>Durée:</strong> {{ content.duration }}</p>

        <div class="text-center">
          <mdb-btn class="btn" @click="Comments(content.id_c)"
            >Laisser un commentaire</mdb-btn
          >
        </div>
        <br />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../../layouts/Navbarpro.vue";
import { mapGetters } from "vuex";
import { mdbBtn } from "mdbvue";
import Footer from "../../layouts/Footer.vue";

export default {
  name: "AllPosts",
  components: {
    Navbarpro,
    Footer,
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
      },
      comments: {
        comments: "",
        id_post: this.$store.state.tokenIdContent
      },
      category: ""
    };
  },
  computed: {
    ...mapGetters(["AllContent", "CategoryTab", "CategoryContentTab"])
  },

  methods: {
    async selectCategory(category) {
      console.log(category);
      if (category === "") {
        this.mounted();
      } else {
        let result = await this.axios.get(
          `http://localhost:8000/category/${category}`
        );
        console.log(result.data),
          this.$store.dispatch("categoryContentTab", result.data);
      }
    },

    keepUnique(array) {
      console.log(array);
      let tab = [];
      for (let category of array) {
        if (!tab.includes(category.category)) {
          tab.push(category.category);
        }
      }
      console.log(tab);
      return tab;
    },

    async Comments(id) {
      const headers = {
        Authorization: `${this.$store.state.tokenPro}`
      };
      console.log(headers);
      this.axios.get(`http/localhost/comments/${id}`, {
        headers: headers
      });

      this.$router.push("/comments");
    }
  },

  async mounted() {
    try {
      await this.axios.get("http://localhost:8000/contents").then(result => {
        console.log(result.data);
        this.$store.dispatch("recContent", result.data);
      });

      await this.axios.get("http://localhost:8000/category").then(resultat => {
        console.log(resultat.data);
        this.$store.dispatch("categoryTab", this.keepUnique(resultat.data));
        console.log(this.keepUnique(resultat.data));
      });
    } catch (error) {
      console.log(error);
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
}
.btn {
  background-image: url("../../images/bgcolor bouton.jpg");
  background-size: 100%;
  text-shadow: 1px 1px 2px black;
}
.textarea {
  width: 30%;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: inherit;
  outline: none;
  padding: 20px;
  min-height: 100px;
  box-sizing: border-box;
}
</style>
