<template>
    <th>
        <span class="day-of-month">{{ dayOfMonth }}</span>
        <span class="day-name">{{ dayName }}</span>
        <span class="month-name">{{ monthName }}</span>
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
}
</script>

