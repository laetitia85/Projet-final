<template>
  <div>
    <NavBarHome />
    <div class="contain">
      <br /><br /><br />
      <img class="logo" style="--i" src="../images/logo.png" alt="" />
      <br /><br /><br /><br />
      <p>
        Que tu sois chanteur, auteur ou compositeur , je t’invite à t’exprimer
        et partager ta passion.
      </p>
      <p>
        Les maisons de disques et producteurs indépendants seront la pour
        t’écouter, te conseiller <br />
        et peut être démarrer une belle aventure à tes cotés.
      </p>
      <p>Ici, le physique ne compte pas, seul le talent parlera pour toi !!!</p>

      <div class="container-cards">
        <mdb-card>
          <mdb-card-body class="cards">
            <p>Je suis un artiste</p>
            <mdb-btn tag="a" role="button" class="btn" href="/sign-up"
              >Inscription</mdb-btn
            >

            <mdb-btn tag="a" role="button" class="btn" href="/sign-in"
              >Connexion</mdb-btn
            >
          </mdb-card-body>
        </mdb-card>

        <mdb-card>
          <mdb-card-body class="cards">
            <p>Je suis une maison de disque ou un indépendant</p>
            <mdb-btn tag="a" role="button" class="btn" href="/sign-up-pro"
              >Inscription</mdb-btn
            >
            <mdb-btn tag="a" role="button" class="btn" href="/sign-in-pro"
              >Connexion</mdb-btn
            >
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mdbCard, mdbBtn, mdbCardBody } from "mdbvue";
import Footer from "../layouts/Footer";
import NavBarHome from "../layouts/NavBarHome";

export default {
  name: "Home",
  components: {
    NavBarHome,
    mdbCard,
    mdbBtn,
    mdbCardBody,
    Footer
  }
};
</script>

<style scoped>
.contain {
  background-color: rgb(64, 224, 208, 0.25);
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}

.logo {
  animation: rotating 10s linear infinite;
  transform-style: preserve-3d;
  transform: rotateY(calc(var(--i * 45deg)) translateZ(400px));
}
@keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotateZ(360deg);
  }
}
.logo:hover {
  animation-play-state: paused;
}
.logo {
  transform: perspective(200px);
}

.container-cards {
  display: flex;
  justify-content: space-between;
  padding: 5%;
}
.cards {
  background-color: #41d1cc;
  display: inline-block;
  justify-content: center;
  width: 100%;
  color: black !important;
}
.btn {
  background-image: url("../images/bgcolor bouton.jpg");
  background-size: 100%;
  text-shadow: 1px 1px 2px black;
}
</style>
