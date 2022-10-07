<template>
  <form @submit.prevent="cancelOrder">
    <InputElement
      label="Keterangan"
      id="ket"
      :placeholder="placeholder"
      type="text"
      @blur="ketProps.onBlur"
      @input="ketProps.onInput"
      required
      pattern="\S(.*\S)?"
    ></InputElement>
    <div class="flex justify-around gap-10 text-center">
      <Button class="basis-0 grow shrink" type="submit">Confirm</Button>
      <Button class="basis-0 grow shrink p-button-warning" @click="closeDialog"
        >Tutup</Button
      >
    </div>
  </form>
</template>
<script setup>
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { inject } from "vue";
import { useInput } from "../../composables/useInput";
import { db } from "../../firebase/config";
import { validateNoEmpty } from "../../helpers/validateHelpers";
import InputElement from "./InputElement.vue";

const placeholder = "Sertakan alasan cancel disini.";
const [ketState, ketProps] = useInput(validateNoEmpty);

const dialogRef = inject("dialogRef");
function cancelOrder() {
  const params = dialogRef.value.data;
  const collectionName = "pending";
  const q = query(collection(db, collectionName), where("id", "==", params.id));
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        status: "canceled",
      });
      const updatedDoc = Object.assign(doc.data(), {
        status: "canceled",
        keterangan: ketState.input.value,
      });
      addDoc(collection(db, "canceled"), updatedDoc);
      deleteDoc(doc.ref);
    });
  });
  dialogRef.value.close();
}

function closeDialog() {
  dialogRef.value.close();
}
</script>
