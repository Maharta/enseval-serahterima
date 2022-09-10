<template>
  <main>
    <div>
      <h1>Test</h1>
    </div>
  </main>
</template>

<script setup>
import { auth } from "../firebase/config";

console.log(auth.currentUser.uid);
</script>
