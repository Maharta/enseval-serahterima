import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  id: "userStore",
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      user: null,
    };
  },
  getters: {
    isAuthenticated: (state) => {
      return state.user === null ? false : true;
    },
  },
});
