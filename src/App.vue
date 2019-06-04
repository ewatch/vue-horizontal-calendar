<template>
  <div id="app">
    <table-calendar />
  </div>
</template>

<script>
import TableCalendar from "./components/TableCalendar.vue";

export default {
  name: "app",
  components: {
    TableCalendar
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
