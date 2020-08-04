<template>
  <div class="wrapper">
    <div class="label">{{ title }}</div>
    <div
      class="cell"
      v-for="date in dates"
      :key="date.date.getTime()"
      :class="cssClass"
    >
      <!--      {{ date.date.getDate() }}-->
      <!--      <div>{{ getDayName(date.date.getDay()) }}</div>-->
      <!--      <div>{{ getMonthName(date.date.getMonth()) }}</div>-->
      <!--      @todo: might come handy for single day marks -->
      <!--      <template v-for="occupied in date.occupi">-->
      <!--        <div :key="occupied.id" v-if="occupied.state" style="margin-top: 1rem;">-->
      <!--          occupied with ID {{ occupied.id }} {{ occupied.type }}-->
      <!--        </div>-->
      <!--      </template>-->
    </div>
    <template v-for="occupied in occupations">
      <div
        :class="[
          'occupation',
          !!daysBeforeScheduleDateRange(
            occupied.startDate,
            scheduleStartDate
          ) && 'occupation--startoff',
          !!daysAfterScheduleDateRange(occupied.endDate, scheduleEndDate) &&
            'occupation--endoff'
        ]"
        v-if="
          isInsideScheduleView(
            scheduleStartDate,
            scheduleEndDate,
            occupied.startDate,
            occupied.endDate
          )
        "
        :key="occupied.id"
        :style="
          `width: ${(daysInDateRange(occupied.startDate, occupied.endDate) -
            daysBeforeScheduleDateRange(occupied.startDate, scheduleStartDate) +
            daysAfterScheduleDateRange(occupied.endDate, scheduleEndDate)) *
            50}px;
           left: ${(daysInDateRange(scheduleStartDate, occupied.startDate) -
             1 +
             daysBeforeScheduleDateRange(
               occupied.startDate,
               scheduleStartDate
             )) *
             50 +
             labelWidth}px;
           background-color: ${occupied.background}
           `
        "
      >
        <span>
          {{ occupied.name }}
          <br />
          {{
            new Date(occupied.startDate).getDate() +
              ". " +
              (new Date(occupied.startDate).getMonth() + 1) +
              "."
          }}
          -
          {{
            new Date(occupied.endDate).getDate() +
              ". " +
              (new Date(occupied.endDate).getMonth() + 1) +
              "."
          }}
        </span>
      </div>
    </template>
  </div>
</template>

<script>
import * as dateHelper from "../helper/date";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    dates: {
      type: Array,
      default: () => []
    },
    occupations: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 200
    }
  },
  computed: {
    cssClass: () => {
      return "classi";
    },
    scheduleStartDate() {
      return this.dates[0].date;
    },
    scheduleEndDate() {
      return this.dates[this.dates.length - 1].date;
    }
  },
  methods: {
    getDayName: dateHelper.getDayName,
    getMonthName: dateHelper.getMonthName,
    daysInDateRange: (firstDate, secondDate) => {
      // full days including the day itself
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

      const firstStart = new Date(firstDate);
      firstStart.setHours(0, 0, 0, 0);
      const secondEnd = new Date(secondDate);
      secondEnd.setHours(12, 0, 0, 1);

      const diffTime = secondEnd - firstStart;
      const diffDays = Math.round(Math.abs(diffTime / oneDay));

      if (diffTime < 0) {
        return -1 * diffDays;
      }
      return diffDays;
    },
    daysBeforeScheduleDateRange(startDate, scheduleStartDate) {
      const daysOver = this.daysInDateRange(startDate, scheduleStartDate) - 1;

      if (daysOver < 0) {
        return 0;
      }
      return daysOver;
    },
    daysAfterScheduleDateRange(endDate, scheduleEndDate) {
      const daysOver = this.daysInDateRange(endDate, scheduleEndDate) - 1;
      if (daysOver > 0) {
        return 0;
      }
      return daysOver;
    },
    isInsideScheduleView(
      scheduleStartDate,
      scheduleEndDate,
      startDate,
      endDate
    ) {
      const isNotBeforeView =
        this.daysInDateRange(scheduleStartDate, startDate) +
          this.daysInDateRange(startDate, endDate) >
        1;
      const isNotAfterView =
        this.daysInDateRange(endDate, scheduleEndDate) +
          this.daysInDateRange(startDate, endDate) >
        1;

      return isNotBeforeView && isNotAfterView;
    }
  }
};
</script>
