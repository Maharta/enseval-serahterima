<template>
  <main>
    <form
      @submit.prevent="uploadData"
      class="flex flex-col items-center justify-center"
    >
      <div>
        <InputElement
          label="ID Dokumen"
          type="text"
          mode="small"
          id="id"
          :value="idState.input.value"
          @blur="idProps.onBlur"
          @input="idProps.onInput"
          :class="idInputClass"
          :placeholder="idProps.placeHolder.value"
        />
      </div>

      <div>
        <InputElement
          label="Nilai Dokumen"
          type="text"
          mode="small"
          id="nilai"
          :value="nilaiState.input.value"
          @blur="nilaiProps.onBlur"
          @input="nilaiProps.onInput"
          :class="nilaiInputClass"
          :placeholder="nilaiProps.placeHolder.value"
        />
      </div>
      <div>
        <InputElement
          label="Keterangan"
          type="text"
          mode="small"
          id="ket"
          :value="ketState.input.value"
          @blur="ketProps.onBlur"
          @input="ketProps.onInput"
          :class="ketInputClass"
          :placeholder="ketProps.placeHolder.value"
        />
      </div>
      <Button
        :disabled="!isFormValid"
        type="submit"
        class="p-button-raised p-button-rounded"
        style="padding: 0.5rem 3rem; margin-top: 1rem"
        >Upload</Button
      >
    </form>
    <BaseModal v-if="isDialogOpen" @close-modal="closeDialog">
      <p class="p-4">Order berhasil diupload</p>
    </BaseModal>
  </main>
</template>

<script setup>
import InputElement from "../components/forms/InputElement.vue";
import BaseModal from "../components/Base/BaseModal.vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Document,
  DocumentConverter,
  OwnerTranslator,
} from "../firebase/firestoreHelper";
import { useUserStore } from "../stores/userStore";
import { useConfirmDialog } from "../composables/useConfirmDialog";
import { useInput } from "../composables/useInput";
import { validateNoEmpty } from "../helpers/validateHelpers";
import { computed } from "vue";

const idInputClass = computed(() => {
  return idState.isInputInvalid.value
    ? "bg-[#fddddd] border-solid border-[#b40e0e]"
    : "";
});

const nilaiInputClass = computed(() => {
  return nilaiState.isInputInvalid.value
    ? "bg-[#fddddd] border-solid border-[#b40e0e]"
    : "";
});

const ketInputClass = computed(() => {
  return ketState.isInputInvalid.value
    ? "bg-[#fddddd] border-solid border-[#b40e0e]"
    : "";
});
// due to tailwind constraint, can't pass arbitrary values from useInput composables since it won't be compiled

const isFormValid = computed(
  () =>
    idState.isValid.value && nilaiState.isValid.value && ketState.isValid.value
);

const [idState, idProps] = useInput(validateNoEmpty);
const [nilaiState, nilaiProps] = useInput(validateNoEmpty);
const [ketState, ketProps] = useInput(validateNoEmpty);

const userStore = useUserStore();
const { isDialogOpen, openDialog, closeDialog } = useConfirmDialog();

async function uploadData() {
  const dokumen = new Document({
    id: idState.input.value,
    nilai: nilaiState.input.value,
    ket: ketState.input.value,
    owner: OwnerTranslator[`${userStore.user.uid}`],
  });

  try {
    await addDoc(
      collection(db, OwnerTranslator[`${userStore.user.uid}`]),
      DocumentConverter.toFireStore(dokumen)
    );
    openDialog();
  } catch (error) {
    console.log(error.message);
  }
}
</script>
