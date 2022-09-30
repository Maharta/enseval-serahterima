import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  id: "modalStore",
  state: () => {
    return {
      isModalOpen: false,
    };
  },
  actions: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
});
