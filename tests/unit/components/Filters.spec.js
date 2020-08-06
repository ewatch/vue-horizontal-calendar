import { shallowMount } from "@vue/test-utils";
import Filters from "@/components/Filters.vue";

const selectedDate = new Date();
const componentFactory = propsData => {
	return shallowMount(Filters, {
		propsData: {
			selectedDate,
			...propsData
		}
	});
};

describe("Filters.vue", () => {
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
			const wrapper = componentFactory();
			const selectedDateProp = wrapper.vm.$options.props.selectedDate;

			it("should be of type Date", () => {
				expect(selectedDateProp.type).toBe(Date);
			});

			it("should not be required", () => {
				expect(selectedDateProp.required).toBeFalsy();
			});
		});
	});

	describe("the datepicker that is part of the component", () => {
		const wrapper = componentFactory({ selectedDate: new Date() });
		const input = wrapper.find('input[type="date"]');

		it("should have input component with the type date", () => {
			expect(input.exists()).toBeTruthy();
		});

		it("should emit date change", () => {
			input.element.value = "2017-1-1";
			input.trigger("input");

			expect(wrapper.emitted().changeDate[0]).toBeTruthy();
			// expect(wrapper.emitted().changeDate[0]).toBe([new Date(2017,1,1)])
		});

		it("should emit cell changee", () => {
			const input = wrapper.find('input[type="number"]');

			input.element.value = 22;
			input.trigger("change");

			expect(wrapper.emitted().changeCell[0]).toBeTruthy();
			expect(wrapper.emitted().changeCell[0]).toStrictEqual([22]);
		});
	});
});
