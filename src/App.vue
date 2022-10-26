<template>
  <EnsevalHeader :class="headerClass" />
  <LeftNavigation v-if="!onLoginPage" />
  <ConfirmDialog />
  <DynamicDialog />
  <RouterView :class="routerViewClass" />
</template>

<script setup>
import { RouterView } from "vue-router";
import EnsevalHeader from "./components/layout/EnsevalHeader.vue";
import LeftNavigation from "./components/layout/LeftNavigation.vue";
import router from "./router";
import { computed } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
import DynamicDialog from "primevue/dynamicdialog";

const onLoginPage = computed(() => {
  return router.currentRoute.value.fullPath === "/" ? true : false;
});

const routerViewClass = computed(() => {
  return onLoginPage.value ? "py-3" : "md:ml-36 px-3 py-3";
});

const headerClass = computed(() => {
  return onLoginPage.value
    ? "flex justify-between items-center"
    : "border-b-black border-b flex items-center gap-5";
});
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
}

#app {
  height: 100%;
}
</style>
