<script setup lang="ts">
import { ref } from 'vue';
import { useTableItemsStore } from '@/stores/spendingTableItems.js';

const store = useTableItemsStore();
const items = ref(store.tableItems);
const isLoading = ref(store.loading);
const fields = ['itemName', 'amount', 'remark'];

store.$onAction(({ after, onError }) => {
  after(() => {
    items.value = store.tableItems;
    isLoading.value = store.loading;
  });
  onError((e) => {
    console.error(e);
  });
});
</script>

<template>
  <div>
    <b-table striped hover :items="items" :fields="fields" :busy="isLoading">
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>
@/stores/spendingTableItems