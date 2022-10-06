<template>
  <form
    @submit.prevent="editOrder"
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
      />
    </div>
    <Button :disabled="!isFormValid" type="submit">{{ btnLabel }}</Button>
  </form>
</template>

<script setup>
import InputElement from "../forms/InputElement.vue";
import { editDocument, OwnerTranslator } from "../../firebase/firestoreHelper";
import { useUserStore } from "../../stores/userStore";
import { useInput } from "../../composables/useInput";
import { validateNoEmpty } from "../../helpers/validateHelpers";
import { useModalStore } from "../../stores/modalStore";
import { computed } from "vue";

const userStore = useUserStore();
const modalStore = useModalStore();

const props = defineProps({
  btnLabel: String,
  order: Object,
});

const [idState, idProps] = useInput(validateNoEmpty, props.order.id);
const [nilaiState, nilaiProps] = useInput(validateNoEmpty, props.order.nilai);
const [ketState, ketProps] = useInput(validateNoEmpty, props.order.keterangan);
const isFormValid = computed(
  () =>
    idState.isValid.value && nilaiState.isValid.value && ketState.isValid.value
);

function editOrder() {
  const collectionName = OwnerTranslator[userStore.user.uid];
  editDocument(props.order.id, collectionName, {
    id: idState.input.value,
    nilai: nilaiState.input.value,
    keterangan: ketState.input.value,
  });
  modalStore.closeModal();
}
</script>
