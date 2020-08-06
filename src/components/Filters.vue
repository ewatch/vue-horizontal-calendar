<template>
	<div>
		<input
			type="date"
			:value="selectedDate && selectedDate.toISOString().split('T')[0]"
			@input="setSelectedDate($event.target.valueAsDate)"
		/>
		<select
			@change="
				setSelectedDate(
					new Date(new Date().getFullYear(), monthIndex, 1)
				)
			"
			v-model="monthIndex"
		>
			<option
				v-for="(monthName, index) in monthNames"
				:key="monthName"
				:value="index"
			>
				{{ monthName }}
			</option>
		</select>
		Density:
		<input
			type="number"
			min="10"
			max="100"
			:value="cellWidth"
			@change="setCellWidth($event.target.value)"
		/>
	</div>
</template>

<script>
import * as dateHelper from "../helper/date.js";

export default {
	props: {
		cellWidth: {
			type: Number,
			default: 50
		},
		selectedDate: {
			type: Date,
			default: new Date()
		}
	},
	data() {
		return {
			monthNames: dateHelper.monthNames,
			monthIndex: this.selectedDate.getMonth()
		};
	},
	methods: {
		setSelectedDate: function(date) {
			this.$emit("changeDate", new Date(date));
		},
		setCellWidth: function(val) {
			this.$emit("changeCell", parseInt(val, 10));
		}
	}
};
</script>
