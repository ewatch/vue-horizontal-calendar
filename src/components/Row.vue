<template>
  <div class="wrapper">
    <div class="label">{{ title }}</div>
    <div
      class="cell"
      v-for="date in dates"
      :key="date.date.getTime()"
      :class="cssClass"
    >
      <!--{{ log(date) }}-->
      {{ date.date.getDate() }}
      <div>{{ getDayName(date.date.getDay()) }}</div>
      <div>{{ getMonthName(date.date.getMonth()) }}</div>
      <template v-for="occupied in date.occupi">
        <div :key="occupied.id" v-if="occupied.state" style="margin-top: 1rem;">
          occupied with ID {{ occupied.id }} {{ occupied.type }}
        </div>
      </template>
    </div>
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
    }
  }
};
</script>
