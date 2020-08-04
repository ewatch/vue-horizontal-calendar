<template>
	<div class="cell cell--header">
		<div class="day-of-month">{{ dayOfMonth }}</div>
		<div class="day-name">{{ dayName }}</div>
		<div v-if="dayOfMonth === 1" class="month-name">{{ monthName }}</div>
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
	}
};
</script>
