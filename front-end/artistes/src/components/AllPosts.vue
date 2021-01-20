<template>
  <div>
    <Navbarpro />
    <select class="select">
      <option value="">Choisir une catégorie</option>
      {{CategoryContent.length !== 0 ? CategoryContent.map((elem) => { return
      <option value="content.category">{ elem.category }</option>
      }) :
      <option>Il n'y a aucune catégorie</option
      >}}}
    </select>
    <div
      class="container"
      v-for="content in CategoryContent"
      :key="content.id_c"
    >
      <iframe :src="content.content" width="320" height="240" controls />
      <p><strong>Contenu:</strong> {{ content.content_type }}</p>
      <p><strong>Titre:</strong> {{ content.title }}</p>
      <p><strong>Durée:</strong> {{ content.duration }}</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../layouts/Navbarpro.vue";
import { mapGetters } from "vuex";
import Footer from "../layouts/Footer.vue";

export default {
  name: "AllPosts",
  components: {
    Navbarpro,
    Footer,
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
        id_c: this.$store.state.tokenIdContent,
      },
    };
  },
  computed: {
    ...mapGetters(["CategoryContent"]),
  },

  methods: {},

  async mounted() {
    function keepUnique(array, key) {
      return [...new Map(array.map((x) => [key(x), x])).values()];
    }

    try {
      await this.axios
        .get("http://localhost:8000/contents", this.content)
        .then(result => {
          console.log(result.data);
          this.$store.dispatch("categoryTab", result.data);
        });

      await this.axios.get("http://localhost:8000/category").then(resultat => {
        this.$store.dispatch(
          "categoryTab",
          keepUnique(resultat.data, (elem) => elem.category)
        );
        console.log(keepUnique(resultat.data, (elem) => elem.category));
      });
    } catch (error) {
      console.log(error);
    }
  },
  async selectCategory(e) {
    if (e.target.value === "") {
      this.mounted();
    } else {
      console.log(e.target.value);
      let result = await this.axios.get(
        `http://localhost:8000/category/${e.target.value}`
      );
      this.$store.dispatch({ categoryTab: result.data });
    }
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  width: 100px;
}
</style>
