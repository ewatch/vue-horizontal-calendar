<template>
    <table>
        <thead>
            <table-head-cell v-bind:day-of-month="now.getDay()"/>
        </thead>
    </table>
</template>

<script>
import TableHeadCell from './TableHeadCell.vue'

export default {
    components: {
        TableHeadCell
    },
    data () {
        return {
            now: new Date()
        }
    }
}
</script>

