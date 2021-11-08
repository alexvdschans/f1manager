<template>
  <div class="about" v-if="team">
    <h1>Teamoverzicht {{ team.name }}</h1>
    <div>
      Kies je speelronde:
      <select v-model="selectedRound">
        <option
          v-bind:value="round.round"
          :key="round.round"
          v-for="round in seasonSchedule"
        >
          {{ round.track.name }}
        </option>
      </select>
    </div>
    <div v-if="setup && selectedRound != 3">
      <h3>
        Gebruikte team in speelronde {{ selectedRound }} (Niet meer aanpasbaar)
      </h3>
      <div class="slots locked" style="margin-top: 1em;">
        <div class="slot slot_1">{{ setup.driver_1 }}</div>
        <div class="slot slot_2">{{ setup.driver_2 }}</div>
        <div class="slot slot_3">{{ setup.constructor_chassis }}</div>
        <div class="slot slot_4">{{ setup.constructor_engine }}</div>
      </div>
    </div>
    <div v-else-if="team.id > 1">
      <h3>Gebruiker heeft nog geen team gekozen</h3>
    </div>

    <div v-if="team.id == 1 && selectedRound == 3">
      <h3>Stel je team voor deze ronde samen</h3>
      <div class="slots">
        <div class="slot slot_1" @click="openDriverModal(1)">
          <span v-if="setup.driver_1 != ''">{{ driver1Title }}</span>
          <span v-else>Coureur 1</span>
        </div>
        <div class="slot slot_2" @click="openDriverModal(2)">
          <span v-if="setup.driver_2 != ''">{{ driver2Title }}</span>
          <span v-else>Coureur 2</span>
        </div>
        <div class="slot slot_3" @click="openConstructorModal(1)">
          {{ constructor1Title }}
        </div>
        <div class="slot slot_4" @click="openConstructorModal(2)">
          {{ constructor2Title }}
        </div>
      </div>
    </div>
  </div>
  <div class="drivers-list" v-if="driversToggled && selectedRound == 3">
    <h3>Kies een coureur</h3>
    <div
      @click="changeDriver(index)"
      class="driver-panel"
      v-for="(driver, index) in drivers"
      :key="index"
    >
      <span>{{ driver.driverId }}</span>
    </div>
  </div>
  <div
    class="constructors-list"
    v-if="constructorsToggled && selectedRound == 3"
  >
    <h3>Kies een automerk</h3>
    <div
      class="constructor-panel"
      @click="changeConstructor(index)"
      v-for="(constructor, index) in constructors"
      :key="index"
    >
      <span>{{ constructor.constructorId }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Team from "@/types/Team";
import tData from "@/api/teams.json";
import { useRoute } from "vue-router";
import RaceService from "@/services/RaceService";
import ResponseData from "@/types/ResponseData";
import RaceWeekend from "@/types/RaceWeekend";
import { RaceTrack } from "@/types/RaceTrack";
import DriverService from "@/services/DriverService";
import Driver from "@/types/Driver";
import ConstructorService, {
  PaginationType,
  QueryParameters,
} from "@/services/ConstructorService";
import Constructor from "@/types/Constructor";
import useTeamSetup from "@/composables/useTeamSetup";
import { useMyTeamStore } from "@/store/useMyTeamStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "team-show",
  setup() {
    const route = useRoute();

    let state = reactive({
      team: {} as Team,
      drivers: [] as Driver[],
      constructors: [] as Constructor[],
      pagination: {},
      driver1Title: "Coureur 1",
      driver2Title: "Coureur 2",
      constructor1Title: "Chassis",
      constructor2Title: "Motor",
      seasonSchedule: [] as RaceWeekend[],
      driversToggled: false,
      constructorsToggled: false,
      driverSlot: 0,
      constructorSlot: 0,
    });

    let id = Number(route.params.id);
    state.team = tData[id - 1];
    const myTeam = useMyTeamStore();
    const { budget } = storeToRefs(myTeam);

    RaceService.getAll()
      .then((response: ResponseData) => {
        let data = response.data.MRData.RaceTable.Races;

        data.forEach((element: any) => {
          let raceTrack: RaceTrack = {
            name: element.raceName,
          };

          let raceWeekend: RaceWeekend = {
            round: element.round,
            date: element.date,
            track: raceTrack,
          };

          state.seasonSchedule.push(raceWeekend);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    const getDrivers = (): void => {
      DriverService.getAll()
        .then((response: ResponseData) => {
          state.drivers = response.data.MRData.DriverTable.Drivers;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

    const getConstructors = async (): Promise<void> => {
      let params = {} as QueryParameters;
      const response = await ConstructorService.get(params);
      state.constructors = response.constructors;
    };

    const openDriverModal = (value: number) => {
      if (!state.driversToggled) {
        state.driversToggled = true;
        state.constructorsToggled = false;
      }
      state.driverSlot = value;
    };

    const openConstructorModal = (value: number) => {
      if (!state.constructorsToggled) {
        state.constructorsToggled = true;
        state.driversToggled = false;
      }
      state.constructorSlot = value;
    };

    const changeDriver = (driverIdx: number) => {
      if (state.driverSlot == 1) {
        setup.value.driver_1 = state.drivers[driverIdx].driverId;
        state.driver1Title = state.drivers[driverIdx].driverId;
      }
      if (state.driverSlot == 2) {
        setup.value.driver_2 = state.drivers[driverIdx].driverId;
        state.driver2Title = state.drivers[driverIdx].driverId;
      }

      const rndInt = Math.floor(Math.random() * 40) + 7;

      myTeam.$patch({
        budget: budget.value - rndInt,
      });
    };

    const changeConstructor = (constructorIdx: number) => {
      if (state.constructorSlot == 1) {
        setup.value.constructor_chassis =
          state.constructors[constructorIdx].constructorId;
        state.constructor1Title =
          state.constructors[constructorIdx].constructorId;
      }
      if (state.constructorSlot == 2) {
        setup.value.constructor_engine =
          state.constructors[constructorIdx].constructorId;
        state.constructor2Title =
          state.constructors[constructorIdx].constructorId;
      }

      myTeam.$patch({
        budget: budget.value - 20,
      });
    };

    let { setup, selectedRound } = useTeamSetup();

    getDrivers();
    getConstructors();

    return {
      ...toRefs(state),
      openDriverModal,
      openConstructorModal,
      changeDriver,
      changeConstructor,
      setup,
      selectedRound,
    };
  },
});
</script>
<style>
.slots {
  display: flex;
  width: 60%;
  margin: 0 auto;
  justify-content: space-between;
}
.slots.locked .slot {
  background: #e1e1e1;
}
.slot {
  background: #fff;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  width: 250px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;
}
.drivers-list,
.constructors-list {
  width: 25%;
  margin: 1em auto;
}
.driver-panel,
.constructor-panel {
  border: 1px solid #f1f1f1;
  margin-bottom: 1em;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.05);
  padding: 1em;
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
