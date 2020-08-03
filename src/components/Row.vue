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
    <!--    {{ log(occupations) }}-->
    <template v-for="occupied in occupations">
      <div
        class="occupation"
        :key="occupied.id"
        :style="
          `width: ${daysInDateRange(occupied.startDate, occupied.endDate) *
            50}px;
           left: ${(daysInDateRange(dates[0].date, occupied.startDate) - 1) *
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
    }
  },
  methods: {
    getDayName: dateHelper.getDayName,
    getMonthName: dateHelper.getMonthName,
    log: v => {
      console.log(v);
    },
    daysInDateRange: (firstDate, secondDate) => {
      // https://stackoverflow.com/a/2627493/4375061
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

      const firstStart = new Date(firstDate);
      firstStart.setHours(0, 0, 0, 0);
      const secondEnd = new Date(secondDate);
      secondEnd.setHours(23, 59, 59, 999);

      const diffDays = Math.round(Math.abs((firstStart - secondEnd) / oneDay));
      return diffDays;
    }
  }
};
</script>
