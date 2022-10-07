import { computed, ref } from "vue";

export function useInput(validateFn, initialValue = "") {
  const input = ref(initialValue);
  const isTouched = ref(false);

  const isValid = computed(() => {
    return validateFn(input.value);
  });

  const isInputInvalid = computed(() => {
    return !isValid.value && isTouched.value;
  });

  const placeHolder = computed(() => {
    return isInputInvalid.value ? "Input tidak boleh kosong!" : "";
  });

  const onInput = (event) => {
    input.value = event.target.value;
  };

  const onBlur = () => {
    isTouched.value = true;
  };

  const reset = () => {
    isTouched.value = false;
    input.value = "";
  };

  return [
    { isTouched, isValid, isInputInvalid, input, reset },
    { onBlur, onInput, placeHolder },
  ];
}
