<template>
  <div>
    <Navbarpro />
    <div class="contain">
      <br /><br />

      <h2>A propos</h2>
      <div>
        <p class="contactimg">
          <img
            src="../images/photo contact.jpg"
            alt=""
            height="150px"
            width="150px"
          />
        </p>
        <p class="text">
          Passionnée depuis toute petite par la musique, j’ai eu à coeur de
          partager ma passion avec vous. Ce site vous permet de vous exprimer
          librement au travers de votre talent. J’espère que vous aurait su vous
          faire plaisir en toute simplicité.
        </p>
      </div>

      <div>
        <h2>Retrouvez-moi</h2>
        <p>
          Vous avez la moindre question ? N’hésitez pas à me contacter par mail
          <a href="mailto:laetitia.artisteAndpro@gmail.com">
            laetitia.artisteAndpro@gmail.com
          </a>
          ou via les réseaux sociaux en cliquant sur les liens en bas de page.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbarpro from "../layouts/Navbarpro.vue";
import Footer from "../layouts/Footer.vue";

export default {
  name: "ContactPro",
  components: {
    Navbarpro,
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
  padding-bottom: 30px;
  width: 100%;
  min-height: 78vh;
}
h2 {
  color: magenta;
  text-align: center;
}
.contactimg {
  float: right;
}
.text {
  text-align: left;
}
</style>
