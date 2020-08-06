<template>
	<div class="cell" :class="[activeMark && 'cell--selected']">
		<!--			      {{ date.date.getDate() }}-->
		<!--			      <div>{{ getDayName(date.date.getDay()) }}</div>-->
		<!--			      <div>{{ getMonthName(date.date.getMonth()) }}</div>-->
		<div v-if="mark" class="mark" @click="onClickMark">
			{{ mark.name }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		date: {
			type: Date,
			default: null
		},
		mark: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			activeMark: false
		};
	},
	methods: {
		onClickMark() {
			this.activeMark = true;
		}
	}
};
</script>

<style lang="scss">
.mark {
	height: 50px;
	border-bottom: 2px solid green;
	cursor: pointer;
}
</style>
