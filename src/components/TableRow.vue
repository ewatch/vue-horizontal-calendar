<template>
  <tr>
    <td>{{ title }}</td>
    <td v-for="n in amountOfCells" v-bind:key="n">{{ n }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    amountOfCells: {
      type: Number
    }
  }
};
</script>
