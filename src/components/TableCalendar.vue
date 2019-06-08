<template>
  <div>
    <input type="date" :value="selectedDate && selectedDate.toISOString().split('T')[0]"
                   @input="selectedDate = $event.target.valueAsDate" />
    <table>
      <thead>
        <table-head-cell
          v-for="date in dates"
          :class="{ today: date.getDate() === selectedDate.getDate()}"
          :day-of-month="date.getDate()"
          :day-name="getDayName(date.getDay())"
          :month-name="getMonthName(date.getMonth())"
          :key="date.getTime()"
          @cell:clicked="setSelectedDate(date)"
        />
      </thead>
    </table>
  </div>
</template>

<script>
import TableHeadCell from "./TableHeadCell.vue";
import * as dateHelper from "../helper/date.js";

export default {
  components: {
    TableHeadCell
  },
  props: {
    renderDays: {
      type: Number,
      default: 26
    },
    date: {
      type: Date,
      default: () => new Date()
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
      const elementsBeforeAndAfter = (this.renderDays - 1) / 2;
      const startDate = new Date(this.selectedDate);

      startDate.setDate(this.selectedDate.getDate() - elementsBeforeAndAfter);
      for (let i = 0; i < this.renderDays; i++) {
        dateArray.push(new Date(startDate.getTime() + i * 86400000));
      }
      console.log(dateArray);
      return dateArray;
    }
  },
  methods: {
    getDayName: dateHelper.getDayName,
    getMonthName: dateHelper.getMonthName,
    setSelectedDate: function(date) {
      this.selectedDate = date;
    }
  }
};
</script>

<style>
table, td, th {
  border: 1px solid black;
}

.today {
  border: 5px solid blue;
}

th {
  width: 50px;
}
</style>
