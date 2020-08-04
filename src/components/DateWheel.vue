<template>
	<div
		class="date-wheel"
		@mousedown="startDrag"
		@mousemove="doDrag"
		@mouseup="stopDrag"
	></div>
</template>

<script>
import * as dateHelper from "../helper/date";

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
			x: null,
			pointShift: 0
		};
	},
	methods: {
		startDrag() {
			this.dragging = true;
		},
		stopDrag() {
			this.dragging = false;
		},
		doDrag(event) {
			if (this.dragging) {
				if (this.x != null) {
					const diff = this.x - event.clientX;
					this.pointShift += diff;
				}

				if (this.pointShift > this.cellWidth) {
					this.pointShift = 0;
					this.dayJump(1);
				}

				if (-this.pointShift > this.cellWidth) {
					this.pointShift = 0;
					this.dayJump(-1);
				}

				this.x = event.clientX;
			}
		},
		dayJump(daysToJump) {
			const newDate =
				this.selectedDate.getTime() + dateHelper.days(daysToJump);

			this.$emit("change:day", new Date(newDate));
		}
	},
	mounted() {
		document.addEventListener("pointermove", this.doDrag.bind(this));
	},
	destroyed() {
		document.removeEventListener("pointermove", this.doDrag.bind(this));
	}
};
</script>

<style lang="scss" scoped>
.date-wheel {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
}
</style>
