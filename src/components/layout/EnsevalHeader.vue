<template>
  <header>
    <img
      src="../../assets/logo_enseval.jpeg"
      class="w-28 h-28 pl-1 mr-auto"
      alt="logo enseval"
    />
    <router-link v-if="userStore.isAuthenticated" to="/change-password">
      <font-awesome-icon icon="fa-regular fa-user" size="xl" />
    </router-link>

    <button @click="logout" v-if="userStore.isAuthenticated" class="mr-3">
      <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="xl" />
    </button>
  </header>
</template>

<script setup>
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase/config";
import router from "../../router";
import { useUserStore } from "../../stores/userStore";

const userStore = useUserStore();

async function logout() {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    alert(error);
  }
}
</script>
