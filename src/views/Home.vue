<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <Standings></Standings>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Standings from "@/components/Standings.vue";

export default defineComponent({
  name: "Home",
  components: {
    Standings,
  },
});
</script>
