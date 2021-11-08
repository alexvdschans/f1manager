import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMyTeamStore = defineStore("myTeamStore", {
  state: () => {
    return {
      id: null,
      name: "",
      isAdmin: false,
      budget: 200,
      setups: [],
    };
  },
});
