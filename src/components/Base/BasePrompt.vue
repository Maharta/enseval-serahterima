<template>
  <div class="prompt">
    <div class="body"><slot name="body"></slot></div>
    <div class="actions">
      <slot name="actions">
        <Button
          class="p-button-success"
          icon="pi pi-check-circle"
          @click="emit('confirm')"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.prompt {
  padding: 1rem;
  padding-right: 0;
  padding-bottom: 0;
}

.prompt div {
  margin-bottom: 8px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
