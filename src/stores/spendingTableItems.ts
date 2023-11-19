import type { TableItem } from '@/components/TableItem';
import { defineStore } from 'pinia';
import { mande } from 'mande';

const api = mande(import.meta.env.VITE_BACKEND_URL + '/items');
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
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    fetchAndUpdate(date: string) {
      this.setLoading(true);
      api
        .get(date)
        .then((r) => {
          this.changeItems(r as TableItem[]);
          this.setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
  },
});
