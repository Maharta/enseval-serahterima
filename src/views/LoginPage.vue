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

      <InputElement
        label="Email"
        id="username"
        type="email"
        placeholder="Ketik email anda disini"
        @input="emailProps.onInput"
        @blur="emailProps.onBlur"
      ></InputElement>

      <InputElement
        label="Password"
        id="password"
        type="password"
        placeholder="ketik password anda disini"
        @input="passwordProps.onInput"
        @blur="passwordProps.onBlur"
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
import InputElement from "../components/forms/InputElement.vue";
import { ref } from "vue";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import router from "../router";
import { useInput } from "../composables/useInput";
import { validateNoEmpty } from "../helpers/validateHelpers";
import { isEkspedisi } from "../firebase/firestoreHelper";

const [emailState, emailProps] = useInput(validateNoEmpty);
const [passwordState, passwordProps] = useInput(validateNoEmpty);

const loginButton = ref(null);

async function login() {
  loginButton.value.classList.add("scale-90");
  setTimeout(() => {
    loginButton.value.classList.remove("scale-90");
  }, 100);

  try {
    const authData = await signInWithEmailAndPassword(
      auth,
      emailState.input.value,
      passwordState.input.value
    );
    if (!isEkspedisi(authData.user.uid)) {
      router.replace("/upload");
    } else {
      router.replace("/request");
    }
  } catch (error) {
    alert(error.message);
  }
}
</script>
