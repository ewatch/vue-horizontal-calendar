import { shallowMount } from "@vue/test-utils";
import HeadCell from "@/components/HeadCell.vue";

const dayOfMonth = 1;
const componentFactory = propsData => {
	return shallowMount(HeadCell, {
		propsData: {
			dayOfMonth,
			...propsData
		}
	});
};

describe("HeadCell.vue", () => {
	it("exists", () => {
		const wrapper = componentFactory();

		expect(wrapper).toBeDefined();
	});

	describe("test properties", () => {
		describe("should have dayOfMonth prop", () => {
			const wrapper = componentFactory();
			const dayOfMonthProp = wrapper.vm.$options.props.dayOfMonth;

			it("should be of type Number", () => {
				expect(dayOfMonthProp.type).toBe(Number);
			});

			it("should have default value 0", () => {
				expect(dayOfMonthProp.default).toBe(0);
			});

			it("should be required", () => {
				expect(dayOfMonthProp.required).toBeTruthy();
			});

			it("value should be 1", () => {
				expect(wrapper.props().dayOfMonth).toBe(1);
			});
		});

		describe("should have dayName prop", () => {
			const wrapper = componentFactory({ dayName: "Monday" });
			const dayNameProp = wrapper.vm.$options.props.dayName;

			it("should be of type String", () => {
				expect(dayNameProp.type).toBe(String);
			});

			it("should be required", () => {
				expect(dayNameProp.required).toBeFalsy();
			});

			it("value should be Monday", () => {
				expect(wrapper.props().dayName).toBe("Monday");
			});
		});

		describe("should have monthName prop", () => {
			const wrapper = componentFactory({ monthName: "February" });
			const monthNameProp = wrapper.vm.$options.props.monthName;

			it("should be of type String", () => {
				expect(monthNameProp.type).toBe(String);
			});

			it("should be required", () => {
				expect(monthNameProp.required).toBeFalsy();
			});

			it("value should be Monday", () => {
				expect(wrapper.props().monthName).toBe("February");
			});
		});
	});

	describe("test maximal rendering of the component", () => {
		const wrapper = componentFactory({
			dayName: "Monday",
			monthName: "February"
		});

		it("should render a div.cell containing 1", () => {
			expect(wrapper.find("div.cell").text()).toContain("1");
		});

		it("should render a th containing the dayName", () => {
			expect(wrapper.find("div.cell").text()).toContain("Monday");
		});

		it("should render a th containing the monthName", () => {
			expect(wrapper.find("div.cell").text()).toContain("February");
		});
	});

	describe("behaviour of the component", () => {
		it("should emit an event when click on the table head cell", () => {
			const wrapper = componentFactory();

			wrapper.trigger("click");

			expect(wrapper.emitted("cell:clicked")).toHaveLength(1);
		});
	});
});
