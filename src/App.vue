<template>
  <div id="app">
    <calendar :render-days="26" :calendar-data="data" />
  </div>
</template>

<script>
import Calendar from "./components/Calendar";
import { days } from "./helper/date.js";

let todayDate = new Date().getTime();

export default {
  name: "app",
  components: {
    Calendar
  },
  data: function() {
    return {
      data: [
        {
          id: 1,
          name: "Something Beautiful",
          occupations: [
            {
              id: 1,
              name: "Conference",
              startDate: todayDate,
              endDate: todayDate + days(2)
            },
            {
              id: 2,
              name: "Holliday",
              startDate: todayDate + days(2),
              endDate: todayDate + days(6),
              background: "orange"
            },
            {
              id: 3,
              name: "invalid dates",
              startDate: null,
              endDate: null,
              background: undefined
            }
          ]
        },
        {
          id: 2,
          name: "Something else",
          occupations: [
            {
              id: 1,
              name: "Lunchparty",
              startDate: todayDate - days(8),
              endDate: todayDate,
              background: "orange"
            },
            {
              id: 2,
              name: "Work",
              startDate: todayDate + days(1),
              endDate: todayDate + days(3)
            }
          ]
        },
        {
          id: 3,
          name: "Super long",
          occupations: [
            {
              id: 1,
              name: "Super Long Booking",
              startDate: todayDate - days(33),
              endDate: todayDate + days(33),
              background: "lightsalmon"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
