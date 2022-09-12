<template>
  <main class="flex justify-center">
    <form
      @submit.prevent="login"
      class="md:card w-9/12 flex flex-col max-w-xs md:max-w-sm"
    >
      <div class="mb-4">
        <h1 class="text-4xl font-bold">Login</h1>
        <p>Enseval Terbaik</p>
      </div>

      <label
        for="username"
        placeholder="input your username here"
        class="placeholder:text-zinc-400"
        >Email</label
      >
      <InputElement
        id="username"
        type="text"
        v-model="username"
        placeholder="Ketik email anda disini"
      ></InputElement>

      <label for="password" class="placeholder:text-zinc-400">Password</label>

      <InputElement
        id="password"
        type="password"
        v-model="password"
        placeholder="ketik password anda disini"
      ></InputElement>
      <button
        class="hover:bg-blue-700 w-full py-3 rounded-full block mx-auto mt-6 text-white bg-blue-400"
        ref="loginButton"
      >
        Login
      </button>
    </form>
  </main>
</template>

<script setup>
import InputElement from "../components/InputElement.vue";
import { ref } from "vue";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import router from "../router";

const username = ref("");
const password = ref("");

const loginButton = ref(null);

async function login() {
  loginButton.value.classList.add("scale-90");
  setTimeout(() => {
    loginButton.value.classList.remove("scale-90");
  }, 100);

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      username.value,
      password.value
    );
    console.log(response);
    router.push("/dashboard");
  } catch (error) {
    alert(error.message);
  }
}
</script>
