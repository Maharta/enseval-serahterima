import { ref, watch } from "vue";

export function useConfirmDialog(confirmedCallback) {
  const isDialogOpen = ref(false);
  const isConfirmed = ref(false);
  const confirmData = ref(null);

  function openDialog(data) {
    isDialogOpen.value = true;
    confirmData.value = data;
  }

  function confirmDialog() {
    isConfirmed.value = true;
  }

  function closeDialog() {
    isDialogOpen.value = false;
    confirmData.value = null;
  }
  watch(isConfirmed, async () => {
    if (isConfirmed.value) {
      await confirmedCallback(confirmData.value);
      closeDialog();
    }
  });

  return {
    isDialogOpen,
    confirmDialog,
    openDialog,
    closeDialog,
  };
}
