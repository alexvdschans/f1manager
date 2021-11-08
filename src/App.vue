<template>
  <div class="my-account" style="margin-bottom: 2em;">
    Mijn Team: {{ name }} | Mijn Budget: €{{ budget }}M
  </div>
  <div id="nav">
    <router-link to="/">Rankings</router-link> |
    <router-link to="/teams/1">Mijn Team</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useMyTeamStore } from "@/store/useMyTeamStore";

export default defineComponent({
  name: "app-index",
  setup() {
    const myTeam = useMyTeamStore();
    const { name, isAdmin, budget } = storeToRefs(myTeam);

    myTeam.$patch({
      name: "Alex van der Schans",
    });

    return {
      name,
      isAdmin,
      budget,
    };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
