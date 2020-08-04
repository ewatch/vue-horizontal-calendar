<template>
	<div class="wrapper">
		<div class="label">{{ title }}</div>
		<div
			class="cell"
			v-for="date in dates"
			:key="date.date.getTime()"
			:class="cssClass"
		>
			<!--      {{ date.date.getDate() }}-->
			<!--      <div>{{ getDayName(date.date.getDay()) }}</div>-->
			<!--      <div>{{ getMonthName(date.date.getMonth()) }}</div>-->
			<!--      @todo: might come handy for single day marks -->
			<!--      <template v-for="occupied in date.occupi">-->
			<!--        <div :key="occupied.id" v-if="occupied.state" style="margin-top: 1rem;">-->
			<!--          occupied with ID {{ occupied.id }} {{ occupied.type }}-->
			<!--        </div>-->
			<!--      </template>-->
		</div>
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
import Occupation from "./Occupation";

export default {
	components: {
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
		cssClass: () => {
			return "classi";
		},
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
