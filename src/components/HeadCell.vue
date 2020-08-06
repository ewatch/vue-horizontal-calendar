<template>
	<div class="cell cell--header">
		<div class="day-of-month">{{ dayOfMonth }}</div>
		<div class="day-name">{{ getDayName(date.getDay()) }}</div>
		<div v-if="dayOfMonth === 1 || index === 0" class="month-name">{{ getMonthName(date.getMonth()) }}</div>
	</div>
</template>

<script>
import * as dateHelper from "../helper/date";

export default {
	props: {
		date: {
			type: Date,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
	},
	computed: {
		dayOfMonth() {
			return this.date.getDate()
		}
	},
	methods: {
		getDayName: dateHelper.getDayName,
		getMonthName: dateHelper.getMonthName,
	}
};
</script>
