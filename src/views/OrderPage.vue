<template>
  <section>
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
      <Column
        headerStyle="display: flex; justify-content: center"
        bodyStyle="text-align: center"
        header="Actions"
      >
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
            class="p-button-warning"
            style="margin-right: 0.5em"
            icon="pi pi-pencil"
            @click="openModal(slotProps.data)"
          >
          </Button>
          <Button
            type="button"
            icon="pi pi-trash"
            class="p-button-danger"
            style="margin-right: 0.5em"
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
    <BaseModal
      @close-modal="modalStore.closeModal"
      v-if="modalStore.isModalOpen"
    >
      <OrderForm :order="reactiveOrder" btnLabel="Edit"></OrderForm>
    </BaseModal>
  </section>
</template>

<script setup>
import OrderForm from "../components/forms/OrderForm.vue";
import BaseModal from "../components/Base/BaseModal.vue";
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
import { reactive } from "vue";
import { useModalStore } from "../stores/modalStore";

const userStore = useUserStore();
const modalStore = useModalStore();
const collectionName = OwnerTranslator[userStore.user.uid];
const collectionRef = collection(db, collectionName);
const { documentList, isLoading } = useListenToDataChanges(collectionRef);

const reactiveOrder = reactive({});

async function moveToPending(data) {
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

function openModal(order) {
  console.log(order);
  Object.assign(reactiveOrder, order);
  modalStore.isModalOpen = true;
}
</script>
