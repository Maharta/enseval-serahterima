<template>
  <input
    :type="type"
    :id="id"
    :mode="mode"
    :value="modelValue"
    @input="updateInput"
    :class="inputElementClass"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps(["type", "id", "mode", "modelValue"]);
const emit = defineEmits("update:modelValue");

const inputElementClass = computed(() => {
  return props.mode === "small"
    ? "rounded-sm outline outline-1 focus:outline-2 outline-slate-500 mb-4 block"
    : "rounded-sm outline outline-1 focus:outline-2 outline-slate-500 mb-4 block p-3";
});

function updateInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>
