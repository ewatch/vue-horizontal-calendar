<template>
  <div>
    <input
      type="date"
      :value="selectedDate && selectedDate.toISOString().split('T')[0]"
      @input="selectedDate = $event.target.valueAsDate"
    />
    <table>
      <thead>
        <th v-if="tableData.length > 0"></th>
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
          :amountOfCells="renderDays"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableHeadCell from "./TableHeadCell.vue";
import TableRow from "./TableRow.vue";
import * as dateHelper from "../helper/date.js";

const ONE_DAY_AS_MS = 86400000;

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
      const startDate = new Date(this.selectedDate);
      const amountOfDaysBeforeAndAfter = dateHelper.calculateRenderDays(
        this.renderDays
      );

      startDate.setDate(startDate.getDate() - amountOfDaysBeforeAndAfter);
      for (let i = 0; i < this.renderDays; i++) {
        dateArray.push(new Date(startDate.getTime() + i * ONE_DAY_AS_MS));
      }

      return dateArray;
    }
  },
  methods: {
    getDayName: dateHelper.getDayName,
    getMonthName: dateHelper.getMonthName,
    setSelectedDate: function(date) {
      this.selectedDate = date;
    },
    equalsSelectedDate: function(date) {
      return date.getDate() === this.selectedDate.getDate();
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
