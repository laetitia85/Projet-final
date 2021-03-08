<template>
  <div>
    <Navbar />
    <div class="contain">
      <br /><br />
      <div class="bgcolorform">
        <br />
        <div>
          <h2>A propos</h2>
          <br />

          <p class="contactimg">
            <img
              class="img"
              src="../images/photo contact.jpg"
              alt=""
              height="150px"
              width="150px"
            />
          </p>
          <p class="text">
            Passionnée depuis toute petite par la musique, j’ai eu à coeur de
            partager ma passion avec vous. <br />
            Ce site vous permet de vous exprimer librement au travers de votre
            talent. J’espère que vous aurait <br />
            su vous faire plaisir en toute simplicité.
          </p>
        </div>
        <br /><br />
        <div>
          <h2>Retrouvez-moi</h2>
          <br />
          <p class="text">
            Vous avez la moindre question ? N’hésitez pas à me contacter par
            mail
            <a href="mailto:laetitia.artisteAndpro@gmail.com">
              laetitia.artisteAndpro@gmail.com</a
            >
            <br />
            ou via les réseaux sociaux en cliquant sur les liens en bas de page.
          </p>
          <br /><br />
        </div>
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
}
h2 {
  color: magenta;
  text-align: center;
}
.bgcolorform {
  background-color: #41d1cc;
  margin: auto;
  width: 80%;
}
.contactimg {
  float: right;
}
.img {
  width: 140px;
  height: 140px;
  margin: 15px;
  bottom: 20px;
}
.text {
  text-align: center;
  margin: 30px;
}
</style>
