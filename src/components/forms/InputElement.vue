<template>
  <label :for="$attrs.id">{{ label }}</label>
  <input
    v-bind="$attrs"
    :mode="mode"
    @input="updateInput"
    class="rounded-sm outline outline-1 focus:outline-2 outline-slate-500 mb-4 block"
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
const emit = defineEmits(["input"]);

const inputElementClass = computed(() => {
  return props.mode === "small" ? "p-2" : "p-3";
});

function updateInput(event) {
  emit("input", event);
}
</script>
