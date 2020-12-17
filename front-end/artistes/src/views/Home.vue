<template>
  <div class="home">
    <hr class="my-4">
    <FormHandler/>

  </div>
</template>

<script>
// @ is an alias to /src
import FormHandler from "@/components/FormHandler.vue"

export default {
  name: "Home",
  components: {
    FormHandler
  }
};
</script>
