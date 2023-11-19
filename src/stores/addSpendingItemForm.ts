import type { TableItem } from '@/components/TableItem';
import moment from 'moment';
import { defineStore } from 'pinia';

export const useSpendingItemFormStore = defineStore('spendingItemForm', {
  state: () => ({
    spendingItem: {
      itemName: undefined,
      amount: undefined,
      date: moment().format('YYYY-MM-DD'),
      remark: undefined,
    } as unknown as TableItem,
  }),
  getters: {
    item: (state) => state.spendingItem,
    getItemName: (state) => state.spendingItem.itemName,
    getAmount: (state) => state.spendingItem.amount,
    getRemark: (state) => state.spendingItem.remark,
  },
  actions: {
    setItemName(n: string) {
      this.spendingItem.itemName = n;
    },
    setAmount(a: number) {
      this.spendingItem.amount = a;
    },
    setRemark(r: string) {
      this.spendingItem.remark = r;
    },
    setDate(date: string) {
      this.spendingItem.date = date;
    },
  },
});
