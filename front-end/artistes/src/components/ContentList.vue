<template>
  <div>
    <div id="cont" v-for= "content in AllContent" :key="content.title">
      <p><strong>Titre:</strong> {{ content.title }}</p>
      <p><strong>Type de contenu:</strong> {{ content.content_type }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContentList",

  computed: {
    ...mapGetters(["AllContent"]),
  },

  //  computed: {
  //       Contents: function() {return this.$store.state.contents}
  //     },
};
</script>

<style scoped>
#cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 140px;
  border: 1px solid black;
  width: 60%;
}
</style>
