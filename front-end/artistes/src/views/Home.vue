<template>
  <div class="container">
    <br /><br /><br />
    <img src="../images/logo.png" alt="" />
    <br /><br /><br /><br />
    <p>
      Que tu sois chanteur, auteur ou compositeur , je t’invite à t’exprimer et
      partager ta passion.
    </p>
    <p>
      Les maisons de disques et producteurs indépendants seront la pour
      t’écouter, te conseiller et peut être démarrer une belle aventure à tes
      cotés.
    </p>
    <p>Ici, le physique ne compte pas, seul le talent parlera pour toi !!!</p>

    <mdb-card>
      <mdb-card-body class="cards">
        <mdb-card-text>Je suis un artiste</mdb-card-text>
        <mdb-btn class="btn">Inscription</mdb-btn>
        <mdb-btn class="btn">Connexion</mdb-btn>
      </mdb-card-body>
    </mdb-card>

    <mdb-card>
      <mdb-card-body class="cards">
        <mdb-card-text
          >Je suis une maison de disque ou un indépendant</mdb-card-text
        >
        <mdb-btn class="btn">Inscription</mdb-btn>
        <mdb-btn type="submit" class="btn">Connexion</mdb-btn>
      </mdb-card-body>
    </mdb-card>
  </div>
</template>

<script>
// @ is an alias to /src

import { mdbCard, mdbBtn, mdbCardBody, mdbCardText } from "mdbvue";
export default {
  name: "Home",
  components: {
  mdbCard,
  mdbBtn,
  mdbCardBody,
  mdbCardText,
  }
};
</script>

<style>
.container {
  background-color: rgb(64, 224, 208, 0.25);
}
.cards {
  background-color: rgb(0, 128, 128, 0.5);
  display: inline-block;
  justify-content: space-between;
  width: 40%;
}
.btn {
  background-image: url("../images/bgcolor bouton.jpg");
}
</style>
