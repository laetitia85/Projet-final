<template>
  <div>
    <Navbarpro />
    <div class="container">
      <br />
      <label for="idselect">Choisir une categorie</label>
      <br />
      <select
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
      </select>
      <br /><br />
      <div v-for="content in AllContent" :key="content.id_c">
        <iframe :src="content.content" width="320" height="240" controls />
        <p><strong>Contenu:</strong> {{ content.content_type }}</p>
        <p><strong>Titre:</strong> {{ content.title }}</p>
        <p><strong>Durée:</strong> {{ content.duration }}</p>
      </div>
      <textarea
        name="commentaire"
        v-model="comments.comments"
        value="comments.comments"
        class="textarea"
        cols="30"
        rows="5"
        placeholder="votre commentaire ..."
        @input="resize($event)"
      ></textarea
      ><br />
      <div class="text-center">
        <mdb-btn class="btn" @click="addComments()">Envoyer</mdb-btn>
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
        id_post: this.$store.state.tokenId
      },
      category: "",
      selectedCategory: null
    };
  },
  computed: {
    ...mapGetters(["AllContent", "CategoryTab", "CategoryContentTab"]),
    filteredCategoryContentTab: function() {
      return this.CategoryContentTab.filter(content => {
        return (
          content.category.filter(category => {
            return category.id === this.selectedCategory;
          }).length > 0
        );
      });
    }
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
    async addComments() {
      const headers = {
        Authorization: `${this.$store.state.tokenPro}`
      };
      console.log(headers);
      await this.axios
        .post("http://localhost:8000/add-comments", this.comments, {
          headers: headers
        })
        .then(response => {
          console.log(response);

          this.$store.dispatch(
            "recComment",
            "addCommentId",
            response.config.data,
            {
              comments: "",
              id_post: ""
            }
          );
        })

        .catch(function(error) {
          console.log(error);
        }),
        alert("Commentaire ajouté avec succès");
    },

    //   setChange(evt) {
    //     let myinput = evt.target;
    //     let inputname = myinput.name;
    //     let value = myinput.value;
    //     this.$store.dispatch({
    //       [inputname]: value
    //     });
    //   },

    //   async addComments(evt) {
    //     evt.preventDefault();
    //     const headers = {
    //       Authorization: `${this.$store.state.tokenPro}`
    //     };
    //     console.log(headers);
    //     await this.axios
    //       .post("http://localhost:8000/add-comments", this.comments, {
    //         headers: headers
    //       })

    //       .then(response => {
    //         console.log(response);
    //         this.$store
    //           .dispatch("recComment", "addCommentId", response.config.data, {
    //             comments: "",
    //             id_post: ""
    //           })

    //           .catch(function(error) {
    //             console.log(error);
    //           }),
    //           alert("Commentaire ajouté avec succès");
    //       });
    //   },

    //   onReset(evt) {
    //     evt.preventDefault();
    //     this.comments.comments = "";
    //   }
    // },

    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
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

    // document.querySelectorAll("textarea").forEach(element => {
    //   element.addEventListener("keydown", e => {
    //     setInterval(() => {
    // e.target.style.height = "auto";
    // e.target.style.height = `${e.target.scrollHeight}px`};
    // }, 0);
    //   });
    // });
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: 0;
  padding: 0;
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
