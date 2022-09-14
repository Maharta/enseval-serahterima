<template>
  <main>
    <div>
      <form
        @submit.prevent="uploadData"
        class="flex flex-col items-center justify-center"
      >
        <div>
          <label for="id">ID Dokumen</label>
          <InputElement type="text" mode="small" id="id" v-model="id" />
        </div>

        <div>
          <label for="nilai">Nilai Dokumen</label>
          <InputElement type="text" mode="small" id="nilai" v-model="nilai" />
        </div>
        <div>
          <label for="ket">Keterangan</label>
          <InputElement type="text" mode="small" id="ket" v-model="ket" />
        </div>
        <div>
          <button>Upload Order</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import InputElement from "../components/InputElement.vue";
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Document,
  DocumentConverter,
  OwnerTranslator,
} from "../firebase/firestoreHelper";
import { useUserStore } from "../stores/userStore";

const id = ref("");
const nilai = ref("");
const ket = ref("");
const userStore = useUserStore();

async function uploadData() {
  const dokumen = new Document({
    id: id.value,
    nilai: nilai.value,
    ket: ket.value,
    owner: OwnerTranslator[`${userStore.user.uid}`],
  });

  try {
    const docRef = await addDoc(
      collection(db, OwnerTranslator[`${userStore.user.uid}`]),
      DocumentConverter.toFireStore(dokumen)
    );
    console.log(`document added with an id of ${docRef.id}`);
  } catch (error) {
    console.log(error.message);
  }
}
</script>
