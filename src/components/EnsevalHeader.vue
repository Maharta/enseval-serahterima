<template>
  <header>
    <img
      src="../assets/logo_enseval.jpeg"
      class="w-28 h-28 pl-1"
      alt="logo enseval"
    />

    <button @click="logout" class="mr-3">
      <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="xl" />
    </button>
  </header>
</template>

<script setup>
import { signOut } from "@firebase/auth";
import { ref } from "vue";
import { auth } from "../firebase/config";
import router from "../router/index";

const currentUser = ref(auth.currentUser);

auth.onAuthStateChanged(() => {
  currentUser.value = auth.currentUser;
});

async function logout() {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    alert(error.message);
  }
}
</script>
