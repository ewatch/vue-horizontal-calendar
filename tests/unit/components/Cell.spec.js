import { shallowMount } from "@vue/test-utils";
import HeadCell from "@/components/Cell.vue";
import { days } from "../../../src/helper/date";

const date = new Date();
const componentFactory = propsData => {
	return shallowMount(HeadCell, {
		propsData: {
			date,
			...propsData
		}
	});
};

describe("Cell.vue", () => {
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
				expect(dateProp.required).toBeFalsy();
			});
		});

		describe("should have mark prop", () => {
			const wrapper = componentFactory({
				mark: { id: 1, name: "Arrival", date: new Date() }
			});
			const markProp = wrapper.vm.$options.props.mark;

			it("should be of type Object", () => {
				expect(markProp.type).toBe(Object);
			});

			it("should be required", () => {
				expect(markProp.required).toBeFalsy();
			});
		});
	});

	describe("test rendering of the component", () => {
		const wrapper = componentFactory({
			date: null, // Tue, 26 Nov 2019 00:00:00 +0000
			mark: null
		});

		it("should render one div.cell", () => {
			expect(wrapper.findAll("div.cell").length).toEqual(1);
		});

		it("should not render div.mark", () => {
			expect(wrapper.findAll("div.mark").length).toEqual(0);
		});
	});

	describe("test rendering of the component with a mark", () => {
		const wrapper = componentFactory({
			date: new Date(1574726400000), // Tue, 26 Nov 2019 00:00:00 +0000
			mark: { id: 1, name: "Arrival", date: 1574726400001 }
		});

		it("should render a div.mark containing Arrival", () => {
			expect(wrapper.find("div.mark").text()).toContain("Arrival");
		});
	});
});
