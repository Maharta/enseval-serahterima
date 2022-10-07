<template>
  <form
    @submit.prevent="emitSubmit"
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
    <Button :disabled="!isFormValid" type="submit">{{ btnLabel }}</Button>
  </form>
</template>

<script setup>
import InputElement from "../forms/InputElement.vue";
import { useInput } from "../../composables/useInput";
import { validateNoEmpty } from "../../helpers/validateHelpers";
import { computed } from "vue";

const props = defineProps({
  btnLabel: String,
  id: {
    type: String,
    default: "",
  },
  nilai: {
    type: String,
    default: "",
  },
  keterangan: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["submit"]);

const [idState, idProps] = useInput(validateNoEmpty, props.id);
const [nilaiState, nilaiProps] = useInput(validateNoEmpty, props.nilai);
const [ketState, ketProps] = useInput(validateNoEmpty, props.keterangan);
const isFormValid = computed(
  () =>
    idState.isValid.value && nilaiState.isValid.value && ketState.isValid.value
);

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

function emitSubmit() {
  emit(
    "submit",
    props.id,
    idState.input.value,
    nilaiState.input.value,
    ketState.input.value
  );
  idState.reset();
  nilaiState.reset();
  ketState.reset();
}
</script>
