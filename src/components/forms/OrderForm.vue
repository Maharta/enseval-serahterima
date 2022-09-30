<template>
  <form
    @submit.prevent="editOrder"
    class="flex flex-col items-center justify-center"
  >
    <div>
      <InputElement
        label="ID Dokumen"
        type="text"
        mode="small"
        id="id"
        v-model="form.id"
      />
    </div>

    <div>
      <InputElement
        label="Nilai Dokumen"
        type="text"
        mode="small"
        id="nilai"
        v-model="form.nilai"
      />
    </div>
    <div>
      <InputElement
        label="Keterangan"
        type="text"
        mode="small"
        id="ket"
        v-model="form.keterangan"
      />
    </div>
    <div>
      <Button type="submit">{{ btnLabel }}</Button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import InputElement from "../forms/InputElement.vue";
import { editDocument, OwnerTranslator } from "../../firebase/firestoreHelper";
import { useUserStore } from "../../stores/userStore";
import { useModalStore } from "../../stores/modalStore";

const userStore = useUserStore();
const modalStore = useModalStore();

const props = defineProps({
  id: String,
  btnLabel: String,
  order: Object,
});

const form = reactive({
  id: props.order.id, // initial state only
  nilai: props.order.nilai,
  keterangan: props.order.keterangan,
});

function editOrder() {
  const collectionName = OwnerTranslator[userStore.user.uid];
  editDocument(props.order.id, collectionName, {
    id: form.id,
    nilai: form.nilai,
    keterangan: form.keterangan,
  });
  modalStore.closeModal();
}
</script>
