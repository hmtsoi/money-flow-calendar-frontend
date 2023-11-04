import { defineStore } from 'pinia';
import { useTableItemsStore } from './spendingTableItems';
import { mande } from 'mande';
import type { TableItem } from '@/components/TableItem';
import moment from 'moment';

const api = mande(import.meta.env.VITE_BACKEND_URL + '/items');

export const useSelectedDayStore = defineStore('selectedDay', {
  state: () => ({ day: new Date() }),
  getters: {
    selectedDay: (state) => state.day,
  },
  actions: {
    async changeSelectedDay(date: Date) {
      console.log('watch date: ' + date);
      console.log('date str: ' + date.toDateString());
      this.day = date;
      const tableItemsStore = useTableItemsStore();
      try {
        tableItemsStore.loading = true;
        const r: TableItem[] = await api.get(moment(date).format('YYYY-MM-DD'));
        tableItemsStore.loading = false;
        tableItemsStore.changeItems(r);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
