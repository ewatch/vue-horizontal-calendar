<template>
  <div
          :class="[
          'occupation',
          !!daysBeforeScheduleDateRange(
            startDate,
            scheduleStartDate
          ) && 'occupation--startoff',
          !!daysAfterScheduleDateRange(endDate, scheduleEndDate) &&
            'occupation--endoff'
        ]"
          v-if="
          valid &&
          isInsideScheduleView(
            scheduleStartDate,
            scheduleEndDate,
            startDate,
            endDate
          )
        "
          :style="
          `width: ${(daysInDateRange(startDate, endDate) -
            daysBeforeScheduleDateRange(startDate, scheduleStartDate) +
            daysAfterScheduleDateRange(endDate, scheduleEndDate)) *
            cellWidth}px;
           left: ${(daysInDateRange(scheduleStartDate, startDate) -
             1 +
             daysBeforeScheduleDateRange(
               startDate,
               scheduleStartDate
             )) *
             cellWidth +
             labelWidth}px;
           background-color: ${background}
           `
        "
  >
        <span>
          {{ name }}
          <br />
          {{
            new Date(startDate).getDate() +
              ". " +
              (new Date(startDate).getMonth() + 1) +
              "."
          }}
          -
          {{
            new Date(endDate).getDate() +
              ". " +
              (new Date(endDate).getMonth() + 1) +
              "."
          }}
        </span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    startDate: {
      type: Number,
      default: 0
    },
    endDate: {
      type: Number,
      default: null
    },
    scheduleStartDate: {
      type: Date,
      default: null
    },
    scheduleEndDate: {
      type: Date,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    labelWidth: {
      type: Number,
      default: 200
    },
    cellWidth: {
      type: Number,
      default: 50
    }
  },
  computed: {
    valid: function() {
      return this.startDate && this.endDate
    },
    cssClass: () => {
      return "classi";
    },
  },
  methods: {
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
