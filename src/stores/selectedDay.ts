import { defineStore } from 'pinia'
import { useTableItemsStore } from './tableItems'

export const useSelectedDayStore = defineStore('selectedDay', {
  state: () => ({ day: new Date() }),
  getters: {
    selectedDay: (state) => state.day
  },
  actions: {
    changeSelectedDay(date: Date) {
      console.log('watch date: ' + date)
      console.log('date str: ' + date.toDateString())
      this.day = date
      const tableItemsStore = useTableItemsStore()
      if (date.toDateString() === new Date().toDateString()) {
        console.log('change')
        tableItemsStore.changeItems([{ age: 38, first_name: 'Jami', last_name: 'Carney' }])
      } else {
        tableItemsStore.changeItems([
          { age: 20, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 88, first_name: 'Geneva', last_name: 'Wilson' }
        ])
      }
    }
  }
})
