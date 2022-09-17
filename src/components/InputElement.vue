<template>
  <label>{{ label }}</label>
  <input
    v-bind="$attrs"
    :mode="mode"
    :value="modelValue"
    @input="updateInput"
    :class="inputElementClass"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "title",
  },
  mode: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const inputElementClass = computed(() => {
  return props.mode === "small"
    ? "rounded-sm outline outline-1 focus:outline-2 outline-slate-500 mb-4 block"
    : "rounded-sm outline outline-1 focus:outline-2 outline-slate-500 mb-4 block p-3";
});

function updateInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>
