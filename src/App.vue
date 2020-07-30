<template>
  <div id="app">
    <table-calendar :render-days="26" :table-data="tableData" />
  </div>
</template>

<script>
import TableCalendar from "./components/TableCalendar.vue";

let exampleDate = new Date();

export default {
  name: "app",
  components: {
    TableCalendar
  },
  data: function() {
    return {
      tableData: [
        {
          id: 1,
          name: "Something Beautiful",
          "start-date": exampleDate,
          "end-date": new Date(exampleDate.getDate() + 1)
        },
        {
          id: 2,
          name: "Something else",
          "start-date": exampleDate,
          "end-date": new Date(exampleDate.getDate() + 1)
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
