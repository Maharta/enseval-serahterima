<template>
  <section>
    <DataTable
      :value="documentList"
      :paginator="true"
      :rows="5"
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
            @click="openConfirmDialog(slotProps.data)"
          ></Button>
          <Button
            type="button"
            class="p-button-warning"
            style="margin-right: 0.5em"
            icon="pi pi-pencil"
            @click="openEditModal(slotProps.data)"
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
      <OrderForm
        @submit="editOrder"
        :id="editOrderProps.id"
        :nilai="editOrderProps.nilai"
        :keterangan="editOrderProps.keterangan"
        btnLabel="Edit"
      ></OrderForm>
    </BaseModal>

    <BaseModal type="big" v-if="isDialogOpen" @close-modal="closeDialog">
      <BasePrompt @confirm="confirmDialog">
        <template #body>
          <p>
            <strong
              >Apakah anda yakin ingin mengirimkan order ini ke ekspedisi? order
              yang telah dikirim tidak dapat dihapus kembali!</strong
            >
          </p>
        </template>
      </BasePrompt>
    </BaseModal>
  </section>
</template>

<script setup>
import OrderForm from "../components/forms/OrderForm.vue";
import BaseModal from "../components/Base/BaseModal.vue";
import BasePrompt from "../components/Base/BasePrompt.vue";
import { collection, addDoc, Timestamp } from "@firebase/firestore";
import { useListenToDataChanges } from "../composables/useListenToDataChanges";
import { useConfirmDialog } from "../composables/useConfirmDialog";
import { db } from "../firebase/config";
import { useUserStore } from "../stores/userStore";
import {
  OwnerTranslator,
  deleteDocument,
  Document,
  DocumentConverter,
  editDocument,
} from "../firebase/firestoreHelper";
import { reactive } from "vue";
import { useModalStore } from "../stores/modalStore";

const userStore = useUserStore();

const collectionName = OwnerTranslator[userStore.user.uid];
const collectionRef = collection(db, collectionName);
const { documentList, isLoading } = useListenToDataChanges(collectionRef);

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
    await addDoc(
      collection(db, "pending"),
      DocumentConverter.toFireStore(document)
    );
  } catch (error) {
    alert(error.message);
  }
}

const { isDialogOpen, confirmDialog, openDialog, closeDialog } =
  useConfirmDialog(moveToPending); // confirmDialog for send to ekspedisi, also used for modal state

function openConfirmDialog(data) {
  openDialog(data);
}

const editOrderProps = reactive({
  id: "",
  nilai: "",
  keterangan: "",
});
const modalStore = useModalStore(); // modalstore for edit order modal state

function openEditModal(data) {
  editOrderProps.id = data.id;
  editOrderProps.nilai = data.nilai;
  editOrderProps.keterangan = data.keterangan;
  modalStore.openModal();
}

function editOrder(initialId, id, nilai, keterangan) {
  const collectionName = OwnerTranslator[userStore.user.uid];
  editDocument(initialId, collectionName, {
    id,
    nilai,
    keterangan,
  });
  modalStore.closeModal();
}
</script>
