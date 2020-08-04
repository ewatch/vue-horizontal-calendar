import { shallowMount } from "@vue/test-utils";
import Calendar from "@/components/Calendar.vue";
import HeadCell from "@/components/HeadCell.vue";
import Row from "@/components/Row.vue";
import {days} from "../../../src/helper/date";

const componentFactory = propsData => {
  return shallowMount(Calendar, {
    propsData: {
      ...propsData
    }
  });
};

describe("Calendar.vue", () => {
  it("exists", () => {
    const wrapper = componentFactory();

    expect(wrapper).toBeDefined();
  });

  it('should render a default amount of head cells', () => {
    const wrapper = componentFactory();

    expect(wrapper.findAllComponents(HeadCell).length).toBe(13);
  });

  describe("test properties", () => {
    describe("should have renderDays prop", () => {
      const wrapper = componentFactory();
      const renderDaysProp = wrapper.vm.$options.props.renderDays;

      it("should be of type Number", () => {
        expect(renderDaysProp.type).toBe(Number);
      });

      it("should have default value 0", () => {
        expect(renderDaysProp.default).toBe(13);
      });

      it("should be required", () => {
        expect(renderDaysProp.required).toBeFalsy();
      });
    });

    describe("should have date prop", () => {
      const wrapper = componentFactory();
      const dateProp = wrapper.vm.$options.props.date;

      it("should be of type Date", () => {
        expect(dateProp.type).toBe(Date);
      });

      it("should have default value 0", () => {
        expect(dateProp.default().getDate()).toBe(new Date().getDate());
      });

      it("should be required", () => {
        expect(dateProp.required).toBeFalsy();
      });
    });

    describe("should have prop for the array data to be rendered as rows", () => {
      const wrapper = componentFactory();
      const dataProp = wrapper.vm.$options.props.calendarData;

      it("should be of type Array", () => {
        expect(dataProp.type).toBe(Array);
      });

      it("should have by default an empty array", () => {
        expect(dataProp.default()).toEqual([]);
      });
    });
  });

  describe("should have computed prop for the array of dates to be rendered", () => {
    const wrapper = componentFactory();
    const datesCompProp = wrapper.vm.dates;
    const thisMock = { renderDays: 13, date: new Date() };

    it("should be of type Array", () => {
      expect(datesCompProp.constructor).toBe(Array);
    });

    it("should have a certain amount of elements", () => {
      const result = Calendar.computed.dates.call(thisMock);
      expect(result.length).toBe(thisMock.renderDays);
      expect(typeof result[0]).toBe("object");
      expect(result[0].constructor).toBe(Date);
    });
  });

  describe("test minimal rendering of the component", () => {
    const wrapper = componentFactory();

    it("should render a name stub", () => {
      expect(wrapper.findComponent(HeadCell).element.tagName).toBe(
        "HEAD-CELL-STUB"
      );
    });
  });

  describe("method to compare provided date to selected one", () => {
    const testDate = new Date();
    const wrapper = componentFactory({ date: testDate });

    it("should return true if dates are equal", () => {
      expect(wrapper.vm.equalsSelectedDate(testDate)).toBe(true);
    });

    it("should return false if dates are not equal", () => {
      const newDate = new Date(testDate.getDate() + 1);
      expect(wrapper.vm.equalsSelectedDate(newDate)).toBe(false);
    });
  });

  describe("the datepicker that is part of the component", () => {
    const wrapper = componentFactory();

    it("should have input component with the type date", () => {
      expect(wrapper.find('input[type="date"]').exists()).toBeTruthy();
    });

    // it("should set the selected date on change", () => {
    //   const input = wrapper.find('input[type="date"]');
    //
    //   input.element.value = '2017-1-1';
    //   input.trigger("input");
    //   expect(wrapper.vm.$data.selectedDate).toBe(new Date(2017,1,1))
    // });
  });

  describe("the component should be able to receive data", () => {
    const todayDate = new Date();
    const wrapper = componentFactory({
      calendarData: [
        {
          id: 1,
          name: "Something Beautiful",
          occupations: [
            {
              id: 1,
              name: "Conference",
              startDate: todayDate,
              endDate: todayDate + days(2)
            },
            {
              id: 2,
              name: "Holliday",
              startDate: todayDate + days(2),
              endDate: todayDate + days(6),
              background: "orange"
            }
          ]
        },
        {
          id: 2,
          name: "Something else",
          occupations: [
            {
              id: 1,
              name: "Lunchparty",
              startDate: todayDate - days(8),
              endDate: todayDate,
              background: "orange"
            },
            {
              id: 2,
              name: "Work",
              startDate: todayDate + days(1),
              endDate: todayDate + days(3)
            }
          ]
        },
        {
          id: 3,
          name: "Super long",
          occupations: [
            {
              id: 1,
              name: "Super Long Booking",
              startDate: todayDate - days(33),
              endDate: todayDate + days(33),
              background: "lightsalmon"
            }
          ]
        }
      ]
    });

    it("should have an empty table head cell component as first component", () => {
      expect(wrapper.find("div.label").text()).toBe("Items");
    });

    it("should render minimum one row component with a certain content", () => {
      expect(wrapper.findAllComponents(Row).length).toBeGreaterThanOrEqual(1);
      expect(
        wrapper
          .findAllComponents(Row)
          .at(0)
          .html()
      ).toContain("Something Beautiful");
    });

    it("should render as many rows as provided elements in the data array", () => {
      expect(wrapper.findAllComponents(Row).length).toEqual(3);
    });
  });
});
