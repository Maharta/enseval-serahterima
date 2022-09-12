<template>
  <DataTable :paginator="true" :rows="10">
    <Column field="id" :sortable="true" header="ID"></Column>
    <Column field="nilai" header="Nilai" :sortable="true"> </Column>
    <Column field="tanggal" header="Tanggal" :sortable="true"></Column>
    <Column field="keterangan" header="Keterangan" :sortable="true"></Column>
    <Column headerStyle="width: 8em" bodyStyle="text-align: center">
      <template #header>
        <Button type="button" icon="pi pi-cog"></Button>
      </template>
      <template #body>
        <Button
          type="button"
          icon="pi pi-search"
          class="p-button-success"
          style="margin-right: 0.5em"
        ></Button>
        <Button
          type="button"
          icon="pi pi-pencil"
          class="p-button-warning"
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup></script>
