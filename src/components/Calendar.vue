<template>
	<div class="outer" :style="cssVars">
		<filters
			:selectedDate="selectedDate"
			:cellWidth="cellWidth"
			@changeDate="setSelectedDate"
			@changeCell="setCellWidth"
		/>
		<div class="wrapper">
			<div class="label" v-if="calendarData.length > 0">Items</div>
			<div class="cells">
				<head-cell
					v-for="(date, index) in dates"
					:date="date"
					:index="index"
					:key="date.getTime()"
				/>
				<date-wheel
					:selectedDate="selectedDate"
					:cellWidth="cellWidth"
					@changeDay="setSelectedDate"
				/>
			</div>
		</div>
		<row
			v-for="element in calendarData"
			v-bind:key="element.id"
			:title="element.name"
			:dates="datesWithMarks(dates, element.marks)"
			:occupations="element.occupations"
			:labelWidth="labelWidth"
			:cellWidth="cellWidth"
		/>
	</div>
</template>

<script>
import DateWheel from "./DateWheel";
import Filters from "./Filters";
import HeadCell from "./HeadCell";
import Row from "./Row";

export default {
	components: {
		DateWheel,
		Filters,
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
			labelWidth: 200,
			cellWidth: 50
		};
	},
	computed: {
		cssVars() {
			return {
				"--label-width": this.labelWidth + "px",
				"--cell-width": this.cellWidth + "px"
			};
		},
		dates: function() {
			let dateArray = [];
			let startDate = new Date(this.selectedDate);

			dateArray.push(new Date(startDate.setDate(startDate.getDate())));

			for (let i = 1; i < this.renderDays; i++) {
				dateArray.push(
					new Date(startDate.setDate(startDate.getDate() + 1))
				);
			}

			return dateArray;
		}
	},
	methods: {
		setSelectedDate: function(date) {
			this.selectedDate = date;
		},
		setCellWidth: function(cell) {
			this.cellWidth = cell;
		},
		datesWithMarks: (dates, marks) => {
			let dateArray = [];

			dates.forEach(date => {
				let marking = null;

				if (marks) {
					// @todo: better than brute force?!
					marks.forEach(mark => {
						const markDate = new Date(mark.date);

						// same day?
						if (
							markDate.getFullYear() === date.getFullYear() &&
							markDate.getMonth() === date.getMonth() &&
							markDate.getDate() === date.getDate()
						) {
							marking = { id: mark.id, name: mark.name };
						}
					});
				}

				dateArray.push({ date, marking });
			});

			return dateArray;
		}
	}
};
</script>

<style lang="scss">
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
	padding-left: var(--label-width);
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
	width: var(--label-width);
}

.cell {
	width: var(--cell-width);
	height: 50px;
	flex: 0 0 var(--cell-width);
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

	&--selected {
		background-color: lightgreen;
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
