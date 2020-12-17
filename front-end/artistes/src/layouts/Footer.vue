<template>
  <!-- Footer -->
  <mdb-footer color="blue" class="font-small pt-4 mt-4">
    <mdb-container class="text-left">
      <mdb-row>
        <mdb-col sm="6">
          <p>2020 Copyright</p>
          <p>Laetitia de Bardin</p>
        </mdb-col>
        <mdb-col sm="6">
          <ul>
            <li class="list-unstyled"><a href="#!">Mentions Légales</a></li>
            <li class="list-unstyled"><a href="#!">CGU</a></li>
          </ul>
        </mdb-col>
        <mdb-col sm="6">
          <ul>
            <li class="list-unstyled"><a href="#!">contact</a></li>
          </ul>
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
    </mdb-container>
  </mdb-footer>
  <!-- Footer -->
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "FooterPage",
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
};
</script>
