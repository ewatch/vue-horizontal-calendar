import { shallowMount } from "@vue/test-utils";
import DateWheel from "@/components/DateWheel.vue";

const componentFactory = propsData => {
	return shallowMount(DateWheel, {
		propsData: {
			...propsData
		}
	});
};

describe("DateWheel.vue", () => {
	it("exists", () => {
		const wrapper = componentFactory();

		expect(wrapper).toBeDefined();
	});

	describe("test properties", () => {
		describe("should have cellWidth prop", () => {
			const wrapper = componentFactory();
			const cellWidthProp = wrapper.vm.$options.props.cellWidth;

			it("should be of type Number", () => {
				expect(cellWidthProp.type).toBe(Number);
			});

			it("should have default value 50", () => {
				expect(cellWidthProp.default).toBe(50);
			});

			it("should not be required", () => {
				expect(cellWidthProp.required).toBeFalsy();
			});
		});

		describe("should have selectedDate prop", () => {
			const wrapper = componentFactory({ dayName: "Monday" });
			const selectedDateProp = wrapper.vm.$options.props.selectedDate;

			it("should be of type Date", () => {
				expect(selectedDateProp.type).toBe(Date);
			});

			it("should not be required", () => {
				expect(selectedDateProp.required).toBeFalsy();
			});
		});
	});

	describe("test maximal rendering of the component", () => {
		const wrapper = componentFactory();

		it("should render a div.date-wheel containing nothing", () => {
			expect(wrapper.find("div.date-wheel").text()).toContain("");
		});
	});
});
