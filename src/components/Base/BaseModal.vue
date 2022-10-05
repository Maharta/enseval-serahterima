<template>
  <Teleport to="body">
    <div @click="$emit('closeModal')" class="backdrop"></div>
    <div class="modal" :class="modalClass">
      <div class="header flex justify-end">
        <Button @click="$emit('closeModal')" class="p-button-warning">x</Button>
      </div>
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";

defineEmits(["closeModal"]);
const props = defineProps({
  type: String,
});

const modalClass = computed(() => {
  return props.type === "big" ? "big" : "small";
});
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.modal.small {
  width: 300px;
}

.modal.big {
  width: 70%;
}
</style>
