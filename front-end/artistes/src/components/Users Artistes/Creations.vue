<template>
  <div>
    <Navbar />
    <div class="contain">
      <br /><br />
      <div class="bgcolorform">
        <p class="sing">
          <img class="img" src="../../images/chant.jpg" alt="" />
        </p>
        <br />
        <p>Chanter est pour toi plus qu’une envie , un besoin!</p>
        <p>Pose ta voix <a class="link" href="/add-contents">ici</a></p>
        <br /><br />
        <p class="writing">
          <img class="img" src="../../images/ecriture.jpg" alt="" />
        </p>
        <br />
        <p>Tu aimes exprimer ce que tu ressens grace à l’écriture.</p>
        <p>Ajoute ton texte <a class="link" href="/add-contents">ici</a></p>

        <br /><br />
        <p class="compo">
          <img class="img" src="../../images/photo compo.jpg" alt="" />
        </p>
        <br />
        <p>Ton instrument de musique est ton ami.</p>
        <p>
          Ajoute tes compositions <a class="link" href="/add-contents">ici</a>
        </p>
        <br /><br />
      </div>
      <br><br>
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
.contain {
  background-color: rgb(64, 224, 208, 0.25);
  padding-right: 20px;
  padding-left: 20px;
  margin: 0;
  width: 100%;
}
.img {
  width: 100px;
  height: 100px;
  margin: 15px;
}
.bgcolorform {
  background-color: #41d1cc;
  margin: auto;
}
.link {
  color: magenta;
}
.sing {
  float: left;
}
.writing {
  float: left;
}
.compo {
  float: left;
}
</style>
