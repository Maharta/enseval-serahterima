<template>
  <nav
    class="flex justify-around text-slate-500 border-r border-r-black p-2 md:inline-block md:h-full md:w-36 md:text-center md:absolute"
  >
    <div v-if="!isEkspedisi" class="md:my-5 hover:text-black">
      <router-link to="/upload" href="">Upload</router-link>
    </div>
    <div v-if="!isEkspedisi" class="md:my-5 hover:text-black">
      <router-link to="/data">Data</router-link>
    </div>
    <div class="md:my-5 hover:text-black">
      <router-link to="/request">Pending</router-link>
    </div>
    <div class="md:my-5 hover:text-black">
      <router-link to="/done">Done</router-link>
    </div>
    <div class="md:my-5 hover:text-black">
      <router-link to="/canceled">Canceled</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { OwnerTranslator } from "../../firebase/firestoreHelper";
import { useUserStore } from "../../stores/userStore";

const userStore = useUserStore();
const isEkspedisi = ref(OwnerTranslator[userStore.user.uid] === "ekspedisi");
</script>
