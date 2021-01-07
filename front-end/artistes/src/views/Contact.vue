<template>
  <div>
    <Navbar />
    <div class="container">
      <br /><br />
      <div class="propos">
        <h2>A propos</h2>
        <p>
          Passionnée depuis toute petite par la musique, j’ai eu à coeur de
          partager ma passion avec vous. Ce site vous permet de vous exprimer
          librement au travers de votre talent. J’espère que vous aurait su vous
          faire plaisir en toute simplicité.
        </p>
        <p class="contactimg">
          <img src="../images/photo contact.jpg" alt="" />
        </p>
      </div>

      <div class="Retrouvezmoi">
        <h2>Retrouvez-moi</h2>
        <p>
          Vous avez la moindre question ? N’hésitez pas à me contacter par mail
          laetitia.artiste@gmail.com ou via les réseaux sociaux en cliquant sur
          les liens en bas de page.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../layouts/Navbar.vue";
import Footer from "../layouts/Footer.vue";

export default {
  name: "Contact",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
}
h2 {
  color: magenta;
}
.contactimg {
  height: 30px;
  width: 30px;
}
</style>
