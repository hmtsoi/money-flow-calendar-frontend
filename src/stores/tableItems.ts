import type { TableItem } from '@/components/TableItem'
import { defineStore } from 'pinia'

export const useTableItemsStore = defineStore('tableItems', {
  state: () => ({
    items: [
      { age: undefined, first_name: undefined, last_name: undefined }
    ] as unknown as TableItem[]
  }),
  getters: {
    tableItems: (state) => state.items
  },
  actions: {
    changeItems(newItems: any[]) {
      this.items = newItems
    }
  }
})
