import { shallowMount } from "@vue/test-utils";
import Occupation from "@/components/Occupation.vue";

const componentFactory = propsData => {
  return shallowMount(Occupation, {
    propsData: {
      ...propsData
    }
  });
};

describe("Occupation.vue", () => {
  it("exists", () => {
    const wrapper = componentFactory();

    expect(wrapper).toBeDefined();
  });

  describe("test properties", () => {
    describe("should have name prop", () => {
      const wrapper = componentFactory();
      const name = wrapper.vm.$options.props.name;

      it("should be of type String", () => {
        expect(name.type).toBe(String);
      });
    });

    // @todo: add props?!
  });

  describe("rendering of component properties", () => {
    it("should render name", () => {
      const wrapper = componentFactory({ name: "Test", startDate: 13345678, endDate: 567890 });

      expect(wrapper.html()).toContain("Test");
    });

    it("should not render a div.occupation tag", () => {
      const wrapper = componentFactory({ name: "Test" });

      expect(wrapper.findAll("div.occupation").length).toEqual(0);
    });

    // @todo: add render test
  });
});
