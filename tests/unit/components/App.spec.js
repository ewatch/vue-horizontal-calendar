import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Calendar from "@/components/Calendar.vue";

describe("render App.vue", () => {
	const wrapper = shallowMount(App);

	it("the app contains the Calendar component", () => {
		expect(wrapper.findAllComponents(Calendar).length).toBe(1);
	});
});
