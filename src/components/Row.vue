<template>
	<div class="wrapper">
		<div class="label">{{ title }}</div>
		<cell
			v-for="date in dates"
			:key="date.date.getTime()"
			:date="date.date"
			:mark="date.marking"
		/>
		<occupation
			v-for="occupation in occupations"
			:name="occupation.name"
			:startDate="occupation.startDate"
			:endDate="occupation.endDate"
			:scheduleStartDate="scheduleStartDate"
			:scheduleEndDate="scheduleEndDate"
			:background="occupation.background"
			:labelWidth="labelWidth"
			:cellWidth="cellWidth"
			:key="occupation.id"
		/>
	</div>
</template>

<script>
import * as dateHelper from "../helper/date";
import Cell from "./Cell";
import Occupation from "./Occupation";

export default {
	components: {
		Cell,
		Occupation
	},
	props: {
		title: {
			type: String,
			default: ""
		},
		dates: {
			type: Array,
			default: () => []
		},
		occupations: {
			type: Array,
			default: () => []
		},
		labelWidth: {
			type: Number,
			default: 200
		},
		cellWidth: {
			type: Number,
			default: 50
		}
	},
	computed: {
		scheduleStartDate() {
			return this.dates[0].date;
		},
		scheduleEndDate() {
			return this.dates[this.dates.length - 1].date;
		}
	},
	methods: {
		getDayName: dateHelper.getDayName,
		getMonthName: dateHelper.getMonthName
	}
};
</script>
