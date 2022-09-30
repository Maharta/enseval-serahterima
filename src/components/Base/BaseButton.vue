<template>
  <button
    :class="[
      'hover:bg-blue-700 py-3 rounded-full block mx-auto mt-6 text-white bg-blue-400',
      buttonClass,
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["bgColor", "hoverColor"]);
const buttonClass = computed(() => {
  if (props.bgColor === undefined && props.hoverColor === undefined) return "";
  if (props.bgColor === undefined) return props.hoverColor;
  return props.bgColor;
});
</script>
