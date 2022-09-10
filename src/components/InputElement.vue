<template>
  <input
    :type="type"
    :id="id"
    :value="modelValue"
    @input="updateInput"
    class="rounded-sm outline outline-1 focus:outline-2 outline-slate-500 mb-4 block p-3"
  />
</template>

<script>
export default {
  props: ["type", "id", "modelValue"],
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
