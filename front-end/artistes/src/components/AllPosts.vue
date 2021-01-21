<template>
  <div>
    <Navbarpro />
    <label for="idselect">Choisir une categorie</label>
    <br />
    <select class="select" id="idselect" @change="selectCategory(category)" v-model="category">
      <option
        :value="category"
        v-for="category in CategoryContent[0]"
        :key="category.category"
     >

        {{ category }}
      </option>
    </select>

    <!-- <select class="select"
      <option value="">Choisir une catégorie</option>
      {{ CategoryContent.length !== 0 ? CategoryContent.forEach((elem) =>
      {return
      <option value="elem.category"> {{ elem.category }} </option>
      }) :
      <option>Il n'y a aucune catégorie</option>
      }}
    </select> -->

    <div class="container" v-for="content in AllContent" :key="content.id_c">
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
    Footer
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
      category: ""
    };
  },
  computed: {
    ...mapGetters(["AllContent", "CategoryContent"])
  },

  methods: {
     selectCategory(category) {
      console.log(category);
      // if (e.target.value === "") {
      //   this.mounted();
      // } else {
      //   console.log(e.target.value);
      //   let result = await this.axios.get(
      //     `http://localhost:8000/category/${e.target.value}`
      //   );
      //   this.$store.dispatch({ categoryTab: result.data });
      // }
    },
      keepUnique(array) {
        console.log(array)
      let tab = [];
      for (let category of array) {
        if (!tab.includes(category.category)) {
          tab.push(category.category);
        }
      }
      console.log(tab)
      return tab;
    }
  },

  async mounted() {
    try {
      await this.axios
        .get("http://localhost:8000/contents", this.content)
        .then((result) => {
          console.log(result.data);
          this.$store.dispatch("recContent", result.data);
        });

      await this.axios.get("http://localhost:8000/category").then((resultat) => {
        // this.category = keepUnique(resultat.data, elem => elem.category);
        console.log(resultat.data)
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
.container {
  background-color: rgb(64, 224, 208, 0.25);
  width: 100px;
}
</style>
