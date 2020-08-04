<template>
	<div class="outer">
		<input
			type="date"
			:value="selectedDate && selectedDate.toISOString().split('T')[0]"
			@input="selectedDate = $event.target.valueAsDate"
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
		<div class="wrapper">
			<div class="label" v-if="calendarData.length > 0">Items</div>
			<div class="cells">
				<head-cell
					v-for="date in dates"
					:day-of-month="date.getDate()"
					:day-name="getDayName(date.getDay())"
					:month-name="getMonthName(date.getMonth())"
					:key="date.getTime()"
				/>
				<date-wheel
					:selectedDate="selectedDate"
					:cellWidth="cellWidth"
					@change:day="setSelectedDate"
				/>
			</div>
		</div>
		<row
			v-for="element in calendarData"
			v-bind:key="element.id"
			:title="element.name"
			:dates="datesWithOccupations(dates, element.occupations)"
			:occupations="element.occupations"
			:labelWidth="labelWidth"
			:cellWidth="cellWidth"
		/>
	</div>
</template>

<script>
import DateWheel from "./DateWheel";
import HeadCell from "./HeadCell";
import Row from "./Row";
import * as dateHelper from "../helper/date.js";

export default {
	components: {
		DateWheel,
		HeadCell,
		Row
	},
	props: {
		renderDays: {
			type: Number,
			default: 13
		},
		date: {
			type: Date,
			default: () => new Date()
		},
		calendarData: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			selectedDate: new Date(),
			labelWidth: 200, // keep in sync with css var
			cellWidth: 50, // keep in sync with css var
			monthNames: dateHelper.monthNames,
			monthIndex: this.date.getMonth()
		};
	},
	computed: {
		dates: function() {
			let dateArray = [];
			let startDate = new Date(this.selectedDate);

			dateArray.push(
				new Date(startDate.setDate(startDate.getDate()))
			);

			for (let i = 1; i < this.renderDays; i++) {
				dateArray.push(
					new Date(startDate.setDate(startDate.getDate() + 1))
				);
			}

			return dateArray;
		}
	},
	methods: {
		getDayName: dateHelper.getDayName,
		getMonthName: dateHelper.getMonthName,
		setSelectedDate: function(date) {
			this.selectedDate = date;
		},
		datesWithOccupations: (dates, occupations) => {
			let dateArray = [];

			dates.forEach((date, index) => {
				const dateTimestamp = date.getTime();

				const occupi = occupations.map(occupation => {
					const startDateStart = new Date(occupation.startDate);
					startDateStart.setHours(0, 0, 0, 0);
					const startDateEnd = new Date(occupation.startDate);
					startDateEnd.setHours(23, 59, 59, 999);

					if (
						startDateStart.getTime() < dateTimestamp &&
						startDateEnd.getTime() > dateTimestamp
					) {
						return {
							id: occupation.id,
							type: "start",
							state: true
						};
					}

					const endDateStart = new Date(occupation.endDate);
					endDateStart.setHours(0, 0, 0, 0);
					const endDateEnd = new Date(occupation.endDate);
					endDateEnd.setHours(23, 59, 59, 999);

					if (
						endDateStart.getTime() < dateTimestamp &&
						endDateEnd.getTime() > dateTimestamp
					) {
						return { id: occupation.id, type: "end", state: true };
					}

					if (
						occupation.startDate < dateTimestamp &&
						occupation.endDate > dateTimestamp
					) {
						return { id: occupation.id, type: "is", state: true };
					}

					return { id: occupation.id, type: "", state: false };
				});

				dateArray.push({ date, occupi });
			});

			return dateArray;
		}
	}
};
</script>

<style lang="scss">
$labelWidth: 200px;
$cellWidth: 50px;

* {
	box-sizing: border-box;
}

.outer {
	overflow-y: scroll;
	/*overflow: hidden;*/
}

.wrapper {
	display: flex;
	position: relative;
	padding-left: $labelWidth;
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid grey;
}

.cells {
	display: flex;
	position: relative;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
}

.pitch-wheel {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	background-color: rgba(122, 122, 0, 0.5);
}

.label {
	position: absolute;
	left: 0;
	top: 0;
	width: $labelWidth;
}

.cell {
	width: $cellWidth;
	height: $cellWidth;
	flex: 0 0 $cellWidth;
	background-color: lightgrey;
	border-radius: 4px;

	&--header {
		background-color: transparent;
		user-select: none;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}
	}
}

.occupation {
	position: absolute;
	top: 0;
	padding-left: 20px;
	text-align: left;
	opacity: 0.6;
	background-color: cornflowerblue;
	border-radius: 20px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	&--startoff {
		padding-left: 10px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&--endoff {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
}
</style>
