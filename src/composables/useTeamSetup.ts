import Team from "@/types/Team";
import TeamSetup from "@/types/TeamSetup";
import { onMounted, watch, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import tData from "@/api/teams.json";

export default function useTeamSetup(): {
  setup: Ref<TeamSetup>;
  selectedRound: Ref<number>;
} {
  const setup = ref({
    driver_1: "",
    driver_2: "",
    constructor_chassis: "",
    constructor_engine: "",
  } as TeamSetup);

  const route = useRoute();
  const id = Number(route.params.id);
  const team: Team = tData[id - 1];
  const selectedRound = ref(1);

  watch(
    selectedRound,
    (currentValue) => {
      if (team.setups && team.setups[currentValue - 1]) {
        setup.value = team.setups[currentValue - 1];
      }
    },
    { immediate: true }
  );

  watch(
    setup,
    (currentValue) => {
      if (setup.value.driver_1 == setup.value.driver_2) {
        alert(`${currentValue.driver_1} already in team`);
        setup.value.driver_1 = "";
      }
      if (setup.value.constructor_chassis == setup.value.constructor_engine) {
        alert(`${currentValue.constructor_chassis} already in team`);
        setup.value.constructor_chassis = "";
        setup.value.constructor_engine = "";
      }
    },
    { immediate: true, deep: true }
  );

  return {
    setup,
    selectedRound,
  };
}
