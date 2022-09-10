<template>
  <EnsevalHeader :class="headerClass" />
  <LeftNavigation v-if="!onLoginPage" />
  <RouterView :class="routerViewClass" />
</template>

<script setup>
import { RouterView } from "vue-router";
import EnsevalHeader from "./components/EnsevalHeader.vue";
import LeftNavigation from "./components/LeftNavigation.vue";
import router from "./router";
import { computed } from "vue";

const onLoginPage = computed(() => {
  return router.currentRoute.value.fullPath === "/" ? true : false;
});

const routerViewClass = computed(() => {
  return onLoginPage.value ? "py-3" : "ml-36 px-3 py-3";
});

const headerClass = computed(() => {
  return onLoginPage.value
    ? "flex justify-between"
    : "border-b-black border-b flex justify-between";
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
