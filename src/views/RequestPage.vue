<template>
  <DataTable
    :paginator="true"
    :rows="10"
    :value="documentList"
    :loading="isLoading"
    :rowClass="rowClass"
  >
    <template #empty> No records found </template>
    <Column field="id" :sortable="true" header="ID"></Column>
    <Column field="nilai" header="Nilai" :sortable="true"> </Column>
    <Column field="tanggal" header="Tanggal" :sortable="true"></Column>
    <Column field="keterangan" header="Keterangan" :sortable="true"></Column>
    <Column field="owner" header="Owner" :sortable="true"></Column>
    <Column field="status" header="Status" :sortable="true"></Column>
    <Column headerStyle="width: 8em" bodyStyle="text-align: center">
      <template #header>
        <Button type="button" icon="pi pi-cog"></Button>
      </template>
      <template #body="slotProps">
        <Button
          type="button"
          icon="pi pi-check"
          class="p-button-success"
          v-if="isEkpedisi"
          :disabled="slotProps.data.status === 'done'"
          @click="confirmStatus(slotProps.data.id)"
          style="margin-right: 0.5em"
        ></Button>
        <Button
          v-else
          type="button"
          icon="pi pi-trash"
          class="p-button-warning"
          @click="deleteDocById(slotProps.data.id)"
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase/config";
import { ref } from "vue";
import { OwnerTranslator, deleteDocument } from "../firebase/firestoreHelper";
import { useListenToDataChanges } from "../composables/useListenToDataChanges";
import { useConfirm } from "primevue/useconfirm";

const userStore = useUserStore();
const currentUser = userStore.user;
const confirm = useConfirm();

const isEkpedisi = ref(false);
isEkpedisi.value = OwnerTranslator[currentUser.uid] === "ekspedisi";

let q;

if (userStore.isAuthenticated) {
  if (isEkpedisi.value) {
    q = collection(db, "pending");
  } else {
    q = query(
      collection(db, "pending"),
      where("owner", "==", OwnerTranslator[userStore.user.uid])
    );
  }
}

const { documentList, isLoading } = useListenToDataChanges(q);

function deleteDocById(id) {
  const collectionName = "pending";
  deleteDocument(id, collectionName);
}

function confirmStatus(id) {
  confirm.require({
    message:
      "Apakah anda yakin ingin melakukan konfirmasi? Order yang telah dikonfirmasi tidak dapat diubah kembali",
    header: "Konfirmasi",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      const collectionName = "pending";
      const q = query(collection(db, collectionName), where("id", "==", id));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            status: "done",
          });
        });
      });
    },
    reject: () => confirm.close(),
    onHide: () => confirm.close(),
  });
}

const rowClass = (data) => {
  return data.status === "done" ? "done" : null;
};
</script>

<style scoped>
:deep(.done) {
}
</style>
