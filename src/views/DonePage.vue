<template>
  <DataTable
    :paginator="true"
    :rows="10"
    :value="documentList"
    :loading="isLoading"
  >
    <template #empty> No records found </template>
    <Column field="id" :sortable="true" header="ID"></Column>
    <Column field="nilai" header="Nilai" :sortable="true"> </Column>
    <Column field="tanggal" header="Tanggal" :sortable="true"></Column>
    <Column field="keterangan" header="Keterangan" :sortable="true"></Column>
    <Column field="owner" header="Owner" :sortable="true"></Column>
    <Column field="status" header="Status" :sortable="true"></Column>
  </DataTable>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import { isEkspedisi, OwnerTranslator } from "../firebase/firestoreHelper";
import { collection, query, where } from "@firebase/firestore";
import { db } from "../firebase/config";
import { useListenToDataChanges } from "../composables/useListenToDataChanges";

let q;
const userStore = useUserStore();

if (userStore.isAuthenticated) {
  if (isEkspedisi(userStore.user.uid)) {
    q = query(collection(db, "done"));
  } else {
    q = query(
      collection(db, "done"),
      where("owner", "==", OwnerTranslator[userStore.user.uid])
    );
  }
}

const { documentList, isLoading } = useListenToDataChanges(q);
</script>
