import { defineStore } from "pinia";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

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
