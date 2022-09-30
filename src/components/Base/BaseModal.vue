<template>
  <Teleport to="body">
    <div @click="$emit('closeModal')" class="backdrop"></div>
    <div class="modal">
      <div class="header flex justify-end">
        <Button @click="$emit('closeModal')" class="p-button-warning">x</Button>
      </div>
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(["closeModal"]);
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
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
