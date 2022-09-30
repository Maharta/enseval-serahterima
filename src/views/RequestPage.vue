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
    <Column
      v-if="isEkspedisi"
      header="Actions"
      headerStyle="width: 8em"
      bodyStyle="text-align: center"
    >
      <template #body="slotProps">
        <Button
          type="button"
          icon="pi pi-check"
          class="p-button-success"
          @click="confirmStatus(slotProps.data.id)"
          style="margin-right: 0.5em"
        ></Button>
        <Button
          type="button"
          icon="pi pi-times"
          class="p-button-warning"
          @click="showCancelDialog(slotProps.data.id)"
        >
        </Button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import CancelForm from "../components/forms/CancelForm.vue";
import { useUserStore } from "../stores/userStore";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase/config";
import { ref } from "vue";
import { OwnerTranslator } from "../firebase/firestoreHelper";
import { useListenToDataChanges } from "../composables/useListenToDataChanges";
import { useConfirm } from "primevue/useconfirm";
import { useDialog } from "primevue/usedialog";

const userStore = useUserStore();
const isEkspedisi = ref(false);
isEkspedisi.value = OwnerTranslator[userStore.user.uid] === "ekspedisi";

let q; //query for fetch and listen
if (userStore.isAuthenticated) {
  if (isEkspedisi.value) {
    q = collection(db, "pending");
  } else {
    q = query(
      collection(db, "pending"),
      where("owner", "==", OwnerTranslator[userStore.user.uid])
    );
  }
}
const { documentList, isLoading } = useListenToDataChanges(q);

const confirmDialog = useConfirm();
function confirmStatus(id) {
  confirmDialog.require({
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
          const updatedDoc = Object.assign(doc.data(), {
            status: "done",
          });
          addDoc(collection(db, "done"), updatedDoc);
          deleteDoc(doc.ref);
        });
      });
    },
    reject: () => confirmDialog.close(),
    onHide: () => confirmDialog.close(),
  });
}

const dynamicdialog = useDialog();
function showCancelDialog(id) {
  dynamicdialog.open(CancelForm, {
    data: {
      id: id,
    },
  });
}

const rowClass = (data) => {
  return data.status === "done" ? "done" : null;
};
</script>
