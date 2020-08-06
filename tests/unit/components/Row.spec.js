import { shallowMount } from "@vue/test-utils";
import Row from "@/components/Row.vue";

const componentFactory = propsData => {
	return shallowMount(Row, {
		propsData: {
			...propsData
		}
	});
};

describe("Row.vue", () => {
	it("exists", () => {
		const wrapper = componentFactory();

		expect(wrapper).toBeDefined();
	});

	describe("test properties", () => {
		describe("should have title prop", () => {
			const wrapper = componentFactory();
			const title = wrapper.vm.$options.props.title;

			it("should be of type String", () => {
				expect(title.type).toBe(String);
			});
		});

		describe("should have dates prop", () => {
			const wrapper = componentFactory();
			const dates = wrapper.vm.$options.props.dates;

			it("should be of type Array", () => {
				expect(dates.type).toBe(Array);
			});
		});

		describe("should have occupations prop", () => {
			const wrapper = componentFactory();
			const occupations = wrapper.vm.$options.props.occupations;

			it("should be of type Array", () => {
				expect(occupations.type).toBe(Array);
			});
		});
	});

	describe("rendering of component properties", () => {
		it("should render title", () => {
			const wrapper = componentFactory({ title: "Test" });

			expect(wrapper.html()).toContain("Test");
		});

		it("should render a div.wrapper tag", () => {
			const wrapper = componentFactory({ title: "Test" });

			expect(wrapper.findAll("div.wrapper").length).toEqual(1);
		});

		it("should render a certain amount of div.cell tags", () => {
			const wrapper = componentFactory({
				title: "Test",
				dates: [
					{ date: new Date(1) },
					{ date: new Date(1000) },
					{ date: new Date(10000) },
					{ date: new Date(1000000) },
					{ date: new Date(100000000) }
				]
			});

			// console.log(wrapper.html())
			expect(wrapper.findAll("cell-stub").length).toEqual(5);
		});
	});
});
