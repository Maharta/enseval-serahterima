<template>
  <DataTable
    :value="documentList"
    :paginator="true"
    :rows="10"
    :loading="isLoading"
  >
    <template #empty> No records found </template>
    <template #loading> Loading Data..</template>

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
          icon="pi pi-check-circle"
          class="p-button-success"
          style="margin-right: 0.5em"
          @click="moveToPending(slotProps.data)"
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          class="p-button-warning"
          @click="
            deleteDocument(
              slotProps.data.id,
              OwnerTranslator[userStore.user.uid]
            )
          "
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { collection, addDoc, Timestamp } from "@firebase/firestore";
import { useListenToDataChanges } from "../composables/useListenToDataChanges";
import { db } from "../firebase/config";
import { useUserStore } from "../stores/userStore";
import {
  OwnerTranslator,
  deleteDocument,
  Document,
  DocumentConverter,
} from "../firebase/firestoreHelper";

const userStore = useUserStore();
const collectionName = OwnerTranslator[userStore.user.uid];
const collectionRef = collection(db, collectionName);
const { documentList, isLoading } = useListenToDataChanges(collectionRef);

async function moveToPending(data) {
  const collectionName = OwnerTranslator[userStore.user.uid];
  deleteDocument(data.id, collectionName);
  try {
    const document = new Document({
      id: data.id,
      nilai: data.nilai,
      ket: data.keterangan,
      owner: data.owner,
      tanggal: Timestamp.fromMillis(Date.parse(data.tanggal)),
    });
    const docRef = await addDoc(
      collection(db, "pending"),
      DocumentConverter.toFireStore(document)
    );
    console.log(`document added with an id of ${docRef.id}`);
  } catch (error) {
    console.log(error.message);
  }
}
</script>
