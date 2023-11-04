import type { TableItem } from '@/components/TableItem';
import { defineStore } from 'pinia';

export const useTableItemsStore = defineStore('tableItems', {
  state: () => ({
    items: [] as TableItem[],
    loading: true,
  }),
  getters: {
    tableItems: (state) => state.items,
  },
  actions: {
    changeItems(newItems: any[]) {
      this.items = newItems;
    },
  },
});
