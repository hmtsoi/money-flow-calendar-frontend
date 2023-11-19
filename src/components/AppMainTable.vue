<script setup lang="ts">
import { ref } from 'vue';
import { useTableItemsStore } from '@/stores/spendingTableItems.js';
import { useSpendingItemFormStore } from '@/stores/addSpendingItemForm.js';
import { useSelectedDayStore } from '@/stores/selectedDay';
import { mande } from 'mande';
import { storeToRefs } from 'pinia';

const store = useTableItemsStore();
const items = ref(store.tableItems);
const isLoading = ref(store.loading);
const fields = ['itemName', 'amount', 'remark'];

const { item, setItemName, setAmount, setRemark, setDate } = useSpendingItemFormStore();

const formStoreRef = storeToRefs(useSpendingItemFormStore());
const { selectedDay } = storeToRefs(useSelectedDayStore());
const tableItemsStore = useTableItemsStore();

const api = mande(import.meta.env.VITE_BACKEND_URL + '/items');

async function postFormData(event: any) {
  event.preventDefault();
  setDate(selectedDay.value);
  try {
    await api.post(item);
    resetField();
    tableItemsStore.fetchAndUpdate(selectedDay.value);
  } catch (e) {
    console.error(e);
  }
}

const onResetForm = (e: any) => {
  e.preventDefault();
  resetField();
};

const resetField = () => {
  setItemName(undefined);
  setAmount(undefined);
  setRemark(undefined);
};

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
  <b-form @submit="postFormData" @reset="onResetForm">
    <div class="row g-3">
      <div class="col-3">
        <label class="sr-only" for="inline-form-input-date">Date</label>
        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-date" v-model="selectedDay" readonly> </b-form-input>
        </b-input-group>
      </div>
      <div class="col-3">
        <label class="sr-only" for="inline-form-input-item-name">Item Name</label>
        <b-form-input
          id="inline-form-input-item-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Item Name"
          v-model="formStoreRef.spendingItem.value.itemName"
        ></b-form-input>
      </div>
      <div class="col-3">
        <label class="sr-only" for="inline-form-input-amount">Amount</label>
        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input
            id="inline-form-input-amount"
            placeholder="Amount"
            pattern="[0-9]+([,\.][0-9]+)?"
            oninvalid="this.setCustomValidity('Please enter a positive number')"
            v-model="formStoreRef.spendingItem.value.amount"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col-3">
        <label class="sr-only" for="inline-form-input-remark">Remark</label>
        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input
            id="inline-form-input-remark"
            placeholder="Remark"
            v-model="formStoreRef.spendingItem.value.remark"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="row g-3">
        <div>
          <b-button type="submit" variant="primary">Save</b-button>
        </div>
        <div>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </div>
    </div>
  </b-form>
</template>
@/stores/spendingTableItems
