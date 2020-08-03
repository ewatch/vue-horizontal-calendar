<template>
  <div class="cell" @click="onCellClicked">
    <div class="day-of-month">{{ dayOfMonth }}</div>
    <div class="day-name">{{ dayName }}</div>
    <div class="month-name">{{ monthName }}</div>
  </div>
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
  },
  methods: {
    onCellClicked: function() {
      this.$emit("cell:clicked");
    }
  }
};
</script>
