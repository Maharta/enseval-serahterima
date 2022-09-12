<template>
  <DataTable :value="documentList" :paginator="true" :rows="10">
    <Column field="id" :sortable="true" header="ID"></Column>
    <Column field="nilai" header="Nilai" :sortable="true"> </Column>
    <Column field="tanggal" header="Tanggal" :sortable="true"></Column>
    <Column field="keterangan" header="Keterangan" :sortable="true"></Column>
    <Column headerStyle="width: 8em" bodyStyle="text-align: center">
      <template #header>
        <Button type="button" icon="pi pi-cog"></Button>
      </template>
      <template #body>
        <Button
          type="button"
          icon="pi pi-search"
          class="p-button-success"
          style="margin-right: 0.5em"
        ></Button>
        <Button
          type="button"
          icon="pi pi-pencil"
          class="p-button-warning"
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { db } from "../firebase/config.js";
import { collection, onSnapshot } from "firebase/firestore";
import { OwnerTranslator } from "../firebase/firestoreHelper";
import { onBeforeRouteLeave } from "vue-router";

const documentList = ref([]);
const userStore = useUserStore();
let unsub;

if (userStore.user) {
  try {
    const collectionName = OwnerTranslator[`${userStore.user.uid}`];
    const collectionRef = collection(db, collectionName);
    unsub = onSnapshot(collectionRef, (col) => {
      documentList.value = [];

      col.docs.forEach((doc) => {
        const data = doc.data();
        const convertedTimestamp = {
          tanggal: data.tanggal.toDate().toLocaleString(),
        };
        Object.assign(data, convertedTimestamp);
        documentList.value.push(data);
      });
    });
  } catch (error) {
    alert(error.message);
  }
}

onBeforeRouteLeave(() => {
  unsub();
});
</script>
