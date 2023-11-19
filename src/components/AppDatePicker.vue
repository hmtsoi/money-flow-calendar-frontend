<template>
  <DatePicker
    ref="datePicker"
    v-model="date"
    :rules="rules"
    :attributes="attrs"
    title-position="left"
    :first-day-of-week="2"
    nav-visibility="focus"
    expanded
    show-iso-weeknumbers
    @dayclick="dayChange"
  >
    <template #footer>
      <div class="w-full px-4 pb-3">
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
          @click="moveToday"
        >
          Today
        </button>
      </div>
    </template>
  </DatePicker>
  <div class="container">
    <p></p>
    <h5 class="text-center">Date {{ displayDate }}</h5>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { DatePicker } from 'v-calendar';
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';
import 'v-calendar/style.css';

import { onMounted, ref } from 'vue';
import { useSelectedDayStore } from '@/stores/selectedDay';
import { useTableItemsStore } from '@/stores/spendingTableItems';

const { selectedDay, changeSelectedDay } = useSelectedDayStore();
const tableItemsStore = useTableItemsStore();

const datePicker = ref(DatePicker);
const date = ref(selectedDay);
const displayDate = ref(moment(selectedDay).format('YYYY-MM-DD'));

onMounted(() => {
  moveToday();
});

const rules = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

const attrs = ref([
  {
    key: 'selected',
    highlight: true,
    dates: selectedDay,
  },
]);

const updateCalendar = (d: Date) => {
  date.value = moment(d).format('YYYY-MM-DD');
  changeSelectedDay(d);
  tableItemsStore.fetchAndUpdate(date.value);
  attrs.value = [{ key: 'selected', highlight: true, dates: moment(d).format('YYYY-MM-DD') }];
  displayDate.value = moment(d).format('YYYY-MM-DD');
};

function moveToday() {
  const d = new Date();
  updateCalendar(d);
  datePicker.value.move(d);
}

function dayChange(val: CalendarDay) {
  updateCalendar(val.date);
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
