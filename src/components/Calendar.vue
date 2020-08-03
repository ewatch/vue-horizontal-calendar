<template>
  <div class="outer">
    <input
      type="date"
      :value="selectedDate && selectedDate.toISOString().split('T')[0]"
      @input="selectedDate = $event.target.valueAsDate"
    />
    <div class="wrapper">
      <div class="label" v-if="tableData.length > 0">Items</div>
      <head-cell
        v-for="date in dates"
        :class="{ today: equalsSelectedDate(date) }"
        :day-of-month="date.getDate()"
        :day-name="getDayName(date.getDay())"
        :month-name="getMonthName(date.getMonth())"
        :key="date.getTime()"
        @cell:clicked="setSelectedDate(date)"
      />
    </div>
    <row
      v-for="element in tableData"
      v-bind:key="element.id"
      :title="element.name"
      :dates="datesWithOccupations(dates, element.occupations)"
      :occupations="element.occupations"
      :labelWidth="labelWidth"
    />
  </div>
</template>

<script>
import HeadCell from "./HeadCell.vue";
import Row from "./Row.vue";
import * as dateHelper from "../helper/date.js";

export default {
  components: {
    HeadCell,
    Row
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
      selectedDate: new Date(),
      labelWidth: 200 // keep in sync with css var
    };
  },
  computed: {
    dates: function() {
      let dateArray = [];
      let startDate = new Date(this.selectedDate);
      const amountOfDaysBeforeAndAfter = dateHelper.calculateRenderDays(
        this.renderDays
      );

      startDate = new Date(
        startDate.setDate(startDate.getDate() - amountOfDaysBeforeAndAfter)
      );

      for (let i = 0; i < this.renderDays; i++) {
        dateArray.push(new Date(startDate.setDate(startDate.getDate() + 1)));
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
    },
    datesWithOccupations: (dates, occupations) => {
      let dateArray = [];

      dates.forEach((date, index) => {
        const dateTimestamp = date.getTime();

        const occupi = occupations.map(occupation => {
          const startDateStart = new Date(occupation.startDate);
          startDateStart.setHours(0, 0, 0, 0);
          const startDateEnd = new Date(occupation.startDate);
          startDateEnd.setHours(23, 59, 59, 999);

          if (
            startDateStart.getTime() < dateTimestamp &&
            startDateEnd.getTime() > dateTimestamp
          ) {
            return { id: occupation.id, type: "start", state: true };
          }

          const endDateStart = new Date(occupation.endDate);
          endDateStart.setHours(0, 0, 0, 0);
          const endDateEnd = new Date(occupation.endDate);
          endDateEnd.setHours(23, 59, 59, 999);

          if (
            endDateStart.getTime() < dateTimestamp &&
            endDateEnd.getTime() > dateTimestamp
          ) {
            return { id: occupation.id, type: "end", state: true };
          }

          if (
            occupation.startDate < dateTimestamp &&
            occupation.endDate > dateTimestamp
          ) {
            return { id: occupation.id, type: "is", state: true };
          }

          return { id: occupation.id, type: "", state: false };
        });

        dateArray.push({ date, occupi });
      });

      return dateArray;
    }
  }
};
</script>

<style lang="scss">
$labelWidth: 200px;
$cellWidth: 50px;

* {
  box-sizing: border-box;
}

.outer {
  overflow-y: scroll;
}

.wrapper {
  display: flex;
  position: relative;
  width: calc(100% - #{$labelWidth});
  padding-left: $labelWidth;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
}

.label {
  position: absolute;
  left: 0;
  top: 0;
  width: $labelWidth;
}

.cell {
  width: $cellWidth;
  height: $cellWidth;
  flex: 0 0 $cellWidth;
  background-color: lightgrey;
  border-radius: 4px;
}

.today {
  border: 5px solid blue;
}

.occupation {
  position: absolute;
  top: 0;
  padding-left: 20px;
  text-align: left;
  opacity: 0.6;
  background-color: cornflowerblue;
  border-radius: 20px;
}
</style>
