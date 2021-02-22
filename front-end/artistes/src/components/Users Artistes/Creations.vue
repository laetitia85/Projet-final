<template>
  <div>
    <Navbar />
    <div class="container">
      <br /><br />
      <div class="sing">
        <img class="img" src="../../images/chant.jpg" alt="" />
        <p>Chanter est pour toi plus qu’une envie , un besoin!</p>
        <p>Pose ta voix <a class="link" href="/add-contents">ici</a></p>
      </div>

      <div class="writing">
        <img class="img" src="../../images/ecriture.jpg" alt="" />
        <p>Tu aimes exprimer ce que tu ressens grace à l’écriture.</p>
        <p>Ajoute ton texte <a class="link" href="/add-contents">ici</a></p>
      </div>

      <div class="compo">
        <img class="img" src="../../images/photo compo.jpg" alt="" />
        <p>Ton instrument de musique est ton ami.</p>
        <p>
          Ajoute tes compositions <a class="link" href="/add-contents">ici</a>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../layouts/Navbar.vue";
import Footer from "../../layouts/Footer.vue";

export default {
  name: "Creations",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(64, 224, 208, 0.25);
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
}

.img {
  width: 100px;
  height: 100px;
}

.link {
  color: magenta;
}
</style>
