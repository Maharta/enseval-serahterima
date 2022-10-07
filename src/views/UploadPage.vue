<template>
  <main>
    <OrderForm @submit="uploadData" btn-label="Upload" />
    <BaseModal v-if="isDialogOpen" @close-modal="closeDialog">
      <p class="p-4 pt-0">Order berhasil diupload</p>
    </BaseModal>
  </main>
</template>

<script setup>
import BaseModal from "../components/Base/BaseModal.vue";
import OrderForm from "../components/forms/OrderForm.vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Document,
  DocumentConverter,
  OwnerTranslator,
} from "../firebase/firestoreHelper";
import { useUserStore } from "../stores/userStore";
import { useConfirmDialog } from "../composables/useConfirmDialog";

const userStore = useUserStore();
const { isDialogOpen, openDialog, closeDialog } = useConfirmDialog();

async function uploadData(_, id, nilai, keterangan) {
  const dokumen = new Document({
    id,
    nilai,
    ket: keterangan,
    owner: OwnerTranslator[`${userStore.user.uid}`],
  });
  try {
    await addDoc(
      collection(db, OwnerTranslator[`${userStore.user.uid}`]),
      DocumentConverter.toFireStore(dokumen)
    );
    openDialog();
  } catch (error) {
    console.log(error.message);
  }
}
</script>
