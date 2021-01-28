<template>
  <!-- Footer -->
  <mdb-footer class="bgcolor">
    <mdb-row>
      <mdb-col sm="4">
        <p>2021 Copyright</p>
        <p>Laetitia de Bardin</p>
      </mdb-col>
      <mdb-col sm="4">
        <p href="#!">Mentions Légales</p>
        <p href="#!">CGU</p>
      </mdb-col>
      <mdb-col sm="4">
       <a href="/contact">Contact</a>
        <!-- <p  href="/contact">Contact</p> -->

        <ul class="list-unstyled list-inline">
          <li class="list-inline-item">
            <a class="btn-floating btn-sm btn-fb mx-1"
              ><i class="fab fa-facebook"> </i
            ></a>
          </li>
          <li class="list-inline-item">
            <a class="btn-floating btn-sm btn-tw mx-1"
              ><i class="fab fa-twitter"> </i
            ></a>
          </li>
        </ul>
      </mdb-col>
    </mdb-row>
  </mdb-footer>
  <!-- Footer -->
</template>

<script>
import { mdbFooter, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "FooterPage",
  components: {
    mdbFooter,
    mdbRow,
    mdbCol
  }
};
</script>

<style>
.bgcolor {
  background-color: #c0c0c0;
}
.bgcolor p {
  color: black;
}
.bgcolor li {
  color: black;
}
</style>
