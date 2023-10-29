<script setup lang="ts">
import { ref } from 'vue'
import { useTableItemsStore } from '@/stores/tableItems'

const store = useTableItemsStore()
const items = ref(store.tableItems)

store.$onAction(({ after, onError }) => {
  after(() => {
    items.value = store.tableItems 
  })
  onError((e) => {
    console.log(e)
  })
})
</script>

<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
  </template>
