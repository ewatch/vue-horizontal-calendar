<template>
  <div>
    <input
      type="date"
      :value="selectedDate && selectedDate.toISOString().split('T')[0]"
      @input="selectedDate = $event.target.valueAsDate"
    />
    <table>
      <thead>
        <th v-if="tableData.length > 0">Items</th>
        <table-head-cell
          v-for="date in dates"
          :class="{ today: equalsSelectedDate(date) }"
          :day-of-month="date.getDate()"
          :day-name="getDayName(date.getDay())"
          :month-name="getMonthName(date.getMonth())"
          :key="date.getTime()"
          @cell:clicked="setSelectedDate(date)"
        />
      </thead>
      <tbody>
        <table-row
          v-for="element in tableData"
          v-bind:key="element.id"
          :title="element.name"
          :dates="datesWithOccupations(dates, element.occupations)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableHeadCell from "./TableHeadCell.vue";
import TableRow from "./TableRow.vue";
import * as dateHelper from "../helper/date.js";

export default {
  components: {
    TableHeadCell,
    TableRow
  },
  props: {
    renderDays: {
      type: Number,
      default: 13
    },
    date: {
      type: Date,
      default: () => new Date()
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedDate: new Date()
    };
  },
  computed: {
    dates: function() {
      let dateArray = [];
      let startDate = new Date(this.selectedDate);
      const amountOfDaysBeforeAndAfter = dateHelper.calculateRenderDays(
        this.renderDays
      );

      startDate = new Date(startDate.setDate(startDate.getDate() - amountOfDaysBeforeAndAfter));

      for (let i = 0; i < this.renderDays; i++) {
        dateArray.push(new Date(startDate.setDate(startDate.getDate() + 1)));
      }

      return dateArray;
    },
  },
  methods: {
    getDayName: dateHelper.getDayName,
    getMonthName: dateHelper.getMonthName,
    setSelectedDate: function(date) {
      this.selectedDate = date;
    },
    equalsSelectedDate: function(date) {
      return date.getDate() === this.selectedDate.getDate();
    },
    datesWithOccupations: (dates, occupations) => {
      let dateArray = [];

      dates.forEach((date, index) => {
        const dateTimestamp = date.getTime();

        const occupi = occupations.map((occupation) => {
          const startDateStart = new Date(occupation.startDate);
          startDateStart.setHours(0,0,0,0);
          const startDateEnd = new Date(occupation.startDate);
          startDateEnd.setHours(23,59,59,999);

          if (startDateStart.getTime() < dateTimestamp && startDateEnd.getTime() > dateTimestamp) {

            return {id: occupation.id, type: 'start', state: true}
          }

          const endDateStart = new Date(occupation.endDate);
          endDateStart.setHours(0,0,0,0);
          const endDateEnd = new Date(occupation.endDate);
          endDateEnd.setHours(23,59,59,999);

          if (endDateStart.getTime() < dateTimestamp && endDateEnd.getTime() > dateTimestamp) {
            return {id: occupation.id, type: 'end', state: true}
          }

          if (occupation.startDate < dateTimestamp && occupation.endDate > dateTimestamp) {
            return {id: occupation.id, type: 'is', state: true}
          }

          return {id: occupation.id, type: '', state: false}
        })

        dateArray.push({date, occupi});
      })

      return dateArray;
    }
  }
};
</script>

<style>
table,
td,
th {
  border: 1px solid black;
}

.today {
  border: 5px solid blue;
}

th {
  width: 50px;
}
</style>
