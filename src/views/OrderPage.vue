<template>
  <ul>
    <li v-for="docs in dokumen" :key="docs.id">{{ docs }}</li>
  </ul>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { db } from "../firebase/config.js";
import { collection, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase/config.js";

const collectionRef = collection(db, "dokumen");

const dokumen = ref([]);

onBeforeMount(async () => {
  const unsub = onSnapshot(
    collectionRef,
    (col) => {
      col.docs.forEach((doc) => {
        const data = doc.data();
        const owner = doc.data().roles.owner;
        if (
          auth.currentUser.uid === owner ||
          auth.currentUser.uid === "RWyBwDwiVtWa9s6FPfszzNFcDth2"
        ) {
          dokumen.value.push(data);
        }
      });
      console.log(dokumen.value);
    },
    (err) => {
      console.log(err.message);
      alert(
        "Telah terjadi kesalahan, silahkan refresh halaman untuk muat ulang data"
      );
      unsub();
    }
  );
});
</script>
