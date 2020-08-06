import { shallowMount } from "@vue/test-utils";
import HeadCell from "@/components/HeadCell.vue";

const date = new Date();
const index = 0;
const componentFactory = propsData => {
	return shallowMount(HeadCell, {
		propsData: {
			date,
			index,
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
		describe("should have date prop", () => {
			const wrapper = componentFactory();
			const dateProp = wrapper.vm.$options.props.date;

			it("should be of type Date", () => {
				expect(dateProp.type).toBe(Date);
			});

			it("should be required", () => {
				expect(dateProp.required).toBeTruthy();
			});
		});

		describe("should have index prop", () => {
			const wrapper = componentFactory({ index: 2 });
			const indexProp = wrapper.vm.$options.props.index;

			it("should be of type Number", () => {
				expect(indexProp.type).toBe(Number);
			});

			it("should be required", () => {
				expect(indexProp.required).toBeTruthy();
			});

			it("value should be 2", () => {
				expect(wrapper.props().index).toBe(2);
			});
		});
	});

	describe("test maximal rendering of the component", () => {
		const wrapper = componentFactory({
			date: new Date(1574726400000), // Tue, 26 Nov 2019 00:00:00 +0000
			index: 0
		});

		it("should render a div.cell containing 11", () => {
			expect(wrapper.find("div.cell").text()).toContain("26");
		});

		it("should render a div.cell containing the dayName", () => {
			expect(wrapper.find("div.cell").text()).toContain("Di");
		});

		it("should render a div.cell containing the monthName", () => {
			expect(wrapper.find("div.cell").text()).toContain("Nov");
		});
	});
});
