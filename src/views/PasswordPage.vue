<template>
  <main v-bind="$attrs">
    <h1 class="text-center uppercase tracking-widest font-bold text-lg mb-5">
      {{ currentAccount }}
    </h1>
    <form class="flex flex-col items-center" @submit.prevent="changePassword">
      <InputElement
        label="Password Baru"
        :class="newPasswordClasses"
        type="password"
        id="newPassword"
        @input="newPasswordProps.onInput"
        @blur="newPasswordProps.onBlur"
        :value="newPasswordState.input.value"
        :placeholder="newPasswordProps.placeHolder.value"
      />
      <InputElement
        label="Confirm Password Baru"
        :class="confirmPasswordClasses"
        type="password"
        id="confirmPassword"
        @input="confirmPasswordProps.onInput"
        @blur="confirmPasswordProps.onBlur"
        :value="confirmPasswordState.input.value"
        :placeholder="confirmPasswordProps.placeHolder.value"
      />
      <Button type="submit" :disabled="!isFormValid">Ganti Password</Button>
    </form>
  </main>
  <BaseModal
    class="pb-10"
    @closeModal="modalStore.closeModal"
    type="authenticate"
    v-if="modalStore.isModalOpen"
    ><ReauthenticateForm @submit="reauthenticate" class="mx-auto" />
  </BaseModal>
</template>

<script setup>
import BaseModal from "../components/Base/BaseModal.vue";
import InputElement from "../components/forms/InputElement.vue";
import ReauthenticateForm from "../components/forms/ReauthenticateForm.vue";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "@firebase/auth";
import { computed } from "vue";
import { useInput } from "../composables/useInput";
import { OwnerTranslator } from "../firebase/firestoreHelper";
import {
  validatePassword,
  validateConfirmPassword,
} from "../helpers/validateHelpers";
import { useUserStore } from "../stores/userStore";
import { useModalStore } from "../stores/modalStore";

const [newPasswordState, newPasswordProps] = useInput(validatePassword);
const [confirmPasswordState, confirmPasswordProps] = useInput(
  validateConfirmPassword.bind(null, newPasswordState.input)
);

const modalStore = useModalStore();

const isFormValid = computed(
  () => newPasswordState.isValid.value && confirmPasswordState.isValid.value
);

async function changePassword() {
  if (!isFormValid.value) {
    alert("Masih ada input yang belum valid!");
  }
  try {
    await updatePassword(userStore.user, newPasswordState.input.value);
    alert("Ganti Password Berhasil");
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      modalStore.openModal();
      return;
    }
    alert(error.message);
  }
}

const userStore = useUserStore();

async function reauthenticate(email, password) {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    await reauthenticateWithCredential(userStore.user, credential);
    modalStore.closeModal();
    alert("Relogin berhasil!");
  } catch (error) {
    alert(error);
  }
}
const currentAccount = OwnerTranslator[userStore.user?.uid];

const newPasswordClasses = computed(() =>
  newPasswordState.isInputInvalid.value
    ? "bg-[#fddddd] border-solid border-[#b40e0e]"
    : ""
);
const confirmPasswordClasses = computed(() =>
  confirmPasswordState.isInputInvalid.value
    ? "bg-[#fddddd] border-solid border-[#b40e0e]"
    : ""
);
</script>
