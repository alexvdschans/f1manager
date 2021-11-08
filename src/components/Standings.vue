<template>
  
  <div class="standing">
    <div v-for="(team, index) in teams" :key="team.id">
      <router-link :to="{ name: 'team-show', params: { id: team.id } }">
        {{ index + 1 }} {{ team.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Team from "@/types/Team";
import TeamService from "@/services/TeamService";
import { storeToRefs } from "pinia";
import { useMyTeamStore } from "@/store/useMyTeamStore";

export default defineComponent({
  name: "standings-index",
  setup() {
    let state = reactive({
      teams: [] as Team[],
      isAdmin: false,
      name: "",
    });

    const getTeams = (): void => {
      TeamService.getAll()
        .then((response: Team[]) => {
          state.teams = response;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

    getTeams();

    return {
      ...toRefs(state),
     
    };
  },
});
</script>
