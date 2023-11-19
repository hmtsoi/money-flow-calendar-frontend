import { defineStore } from 'pinia';
import moment from 'moment';

export const useSelectedDayStore = defineStore('selectedDay', {
  state: () => ({ day: moment().format('YYYY-MM-DD') }),
  getters: {
    selectedDay: (state) => state.day,
  },
  actions: {
    changeSelectedDay(date: Date) {
      this.day = moment(date).format('YYYY-MM-DD');
    },
  },
});
