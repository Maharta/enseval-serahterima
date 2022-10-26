<template>
  <form
    @submit.prevent="emitSubmit"
    class="w-full flex flex-col max-w-xs md:max-w-sm"
  >
    <div class="mb-4 text-center">
      <h1 class="text-4xl font-bold">Re-Login</h1>
      <p>Anda harus melakukan login kembali sebelum mengubah password.</p>
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
      type="submit"
    >
      Re-Login
    </button>
  </form>
</template>

<script setup>
import InputElement from "./InputElement.vue";
import { useInput } from "../../composables/useInput";
import {
  validateNoEmpty,
  validatePassword,
} from "../../helpers/validateHelpers";

const [emailState, emailProps] = useInput(validateNoEmpty);
const [passwordState, passwordProps] = useInput(validatePassword);

const emit = defineEmits(["submit"]);

function emitSubmit() {
  emit("submit", emailState.input.value, passwordState.input.value);
}
</script>
