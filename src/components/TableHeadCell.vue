<template>
  <th>
    <div class="day-of-month">{{ dayOfMonth }}</div>
    <div class="day-name">{{ dayName }}</div>
    <div class="month-name">{{ monthName }}</div>
  </th>
</template>

<script>
export default {
  props: {
    dayOfMonth: {
      type: Number,
      required: true,
      default: 0
    },
    dayName: {
      type: String,
      required: false
    },
    monthName: {
      type: String,
      required: false
    }
  }
};
</script>
