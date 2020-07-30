import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import TableCalendar from "@/components/TableCalendar.vue";

describe("render App.vue", () => {
  const wrapper = shallowMount(App);

  it("the app contains the TableCalendar component", () => {
    expect(wrapper.findAllComponents(TableCalendar).length).toBe(1);
  });
});
