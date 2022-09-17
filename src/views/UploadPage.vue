<template>
  <main>
    <div>
      <form
        @submit.prevent="uploadData"
        class="flex flex-col items-center justify-center card"
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
            id="id"
            v-model="form.nilai"
          />
        </div>
        <div>
          <InputElement
            label="Keterangan"
            type="text"
            mode="small"
            id="id"
            v-model="form.ket"
          />
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
import { reactive } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Document,
  DocumentConverter,
  OwnerTranslator,
} from "../firebase/firestoreHelper";
import { useUserStore } from "../stores/userStore";

const form = reactive({
  id: "",
  nilai: "",
  ket: "",
});

const userStore = useUserStore();

async function uploadData() {
  const dokumen = new Document({
    id: form.id,
    nilai: form.nilai,
    ket: form.ket,
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
