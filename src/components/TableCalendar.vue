<template>
  <table>
    <thead>
      <table-head-cell
        v-for="date in dates"
        :day-of-month="date.getDate()"
        :day-name="getDayName(date.getDay())"
        :key="date.getTime()"
      />
    </thead>
  </table>
</template>

<script>
import TableHeadCell from "./TableHeadCell.vue";

export default {
  components: {
    TableHeadCell
  },
  props: {
    renderDays: {
      type: Number,
      default: 13
    },
    date: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      now: new Date()
    };
  },
  computed: {
    dates: function() {
      let dateArray = [];
      const elementsBeforeAndAfter = (this.renderDays - 1) / 2;
      const startDate = new Date(this.date);

      startDate.setDate(this.date.getDate() - elementsBeforeAndAfter);
      for (let i = 0; i < this.renderDays; i++) {
        dateArray.push(new Date(startDate.getTime() + i * 86400000));
      }
      console.log(dateArray);
      return dateArray;
    }
  },
  methods: {
    getDayName: function(dayOfWeek) {
      const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      return dayNames[dayOfWeek];
    }
  }
};
</script>
