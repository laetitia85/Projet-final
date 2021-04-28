<template>
  <mdb-footer class="bgcolor" id="foot">
    <mdb-row class="link" id="row">
      <mdb-col sm="4" class="foo" >
        <p>2021 Copyright</p>
        <p>Laetitia de Bardin</p>
      </mdb-col>
      <mdb-col sm="4" class="foo" >
         <router-link to="/mentions" active>Mentions Légales</router-link>
         <br><br>
          <router-link to="/cgu" active>CGU</router-link>
      </mdb-col>
      <mdb-col sm="4" class="foo" >
      <router-link to="/contact" active>Contact</router-link>
      <br><br>
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
#foot {
   margin-top: 0 !important;
}
.mt-4 , .my-4{
  margin-top: 0 !important;
}
.bgcolor p {
  color: black;
}
.bgcolor li {
  color: black;
}
.link a {
  color: black;
}
.foo {
  padding: 0 !important;
}
#row {
  margin:0 !important;
}
</style>
