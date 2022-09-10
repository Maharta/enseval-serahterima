<template>
  <nav
    class="inline-block h-full w-34 absolute text-slate-500 border-r border-r-black p-2"
  >
    <div class="gap hover:text-black">
      <a href="">Dashboard</a>
    </div>
    <div class="gap hover:text-black">
      <a href="">Upload Data</a>
    </div>
    <div class="gap hover:text-black">
      <a href="">Data</a>
    </div>
  </nav>
</template>

<style>
.gap:not(:first-child) {
  margin: 20px 0;
  outline: red;
}

.gap {
  padding-left: 18px;
  padding-right: 18px;
}
</style>
