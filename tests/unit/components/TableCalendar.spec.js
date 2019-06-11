import { shallowMount } from "@vue/test-utils"
import TableCalendar from "@/components/TableCalendar.vue"
import TableHeadCell from "@/components/TableHeadCell.vue"



const componentFactory = (propsData) => {
  return shallowMount(TableCalendar, {
    propsData: {
      ...propsData
    }
  })
}

describe('TableCalendar.vue', () => {
  it('exists', () => {
    const wrapper = componentFactory()

    expect(wrapper).toBeDefined()
  })

  it('should have an element as marked being "today"', () => {
    const wrapper = componentFactory()

    expect(wrapper.html()).toContain('class="today"')
    expect(wrapper.findAll(TableHeadCell).length).toBe(13)

    const sixthHeadCell = wrapper.findAll(TableHeadCell).at(6)
    expect(sixthHeadCell.html()).toContain('class="today"')

  })

  describe('test properties', () => {
    describe('should have renderDays prop', () => {
      const wrapper = componentFactory()
      const renderDaysProp = wrapper.vm.$options.props.renderDays

      it('should be of type Number', () => {
        expect(renderDaysProp.type).toBe(Number)
      })

      it('should have default value 0', () => {
        expect(renderDaysProp.default).toBe(13)
      })

      it('should be required', () => {
        expect(renderDaysProp.required).toBeFalsy()
      })
    })

    describe('should have date prop', () => {
      const wrapper = componentFactory()
      const dateProp = wrapper.vm.$options.props.date

      it('should be of type Date', () => {
        expect(dateProp.type).toBe(Date)
      })


      it('should have default value 0', () => {
        expect(dateProp.default().getDate()).toBe(new Date().getDate())
      })


      it('should be required', () => {
        expect(dateProp.required).toBeFalsy()
      })
    })

    describe('should have prop for the array data to be rendered as rows', () => {
      const wrapper = componentFactory()
      const dataProp = wrapper.vm.$options.props.tableData

      it('should be of type Array', () => {
        expect(dataProp.type).toBe(Array)
      })

      it('should have by default an empty array', () => {
        expect(dataProp.default()).toEqual([])
      })
    })
  })

  describe('should have computed prop for the array of dates to be rendered', () => {
    const wrapper = componentFactory()
    const datesCompProp = wrapper.vm.dates
    const thisMock = { renderDays: 13, date: new Date() }

    it('should be of type Array', () => {
      expect(datesCompProp.constructor).toBe(Array)
    })

    it('should have a certain amount of elements', () => {
      const result = TableCalendar.computed.dates.call(thisMock)
      expect(result.length).toBe(thisMock.renderDays)
      expect(typeof result[0]).toBe('object')
      expect(result[0].constructor).toBe(Date)
    })
  })


  describe('test minimal rendering of the component', () => {
    const wrapper = componentFactory()

    it('should render a th with 1', () => {
      expect(wrapper.find(TableHeadCell).is(TableHeadCell)).toBe(true)
    })

    it('should not have an empty table head cell component as first component', () => {
      expect(wrapper.find('th').exists()).toBeFalsy()
    })
  })

  describe('method to compare provided date to selected one', () => {
    const testDate = new Date()
    const wrapper = componentFactory({ date: testDate })

    it('should return true if dates are equal', () => {
      expect(wrapper.vm.equalsSelectedDate(testDate)).toBe(true)
    })

    it('should return false if dates are not equal', () => {
      const newDate = new Date(testDate.getDate() + 1)
      expect(wrapper.vm.equalsSelectedDate(newDate)).toBe(false)
    })
  })

  describe('the component should be able to receive data', () => {
    const testDate = new Date()
    const wrapper = componentFactory({ tableData: [{ 'id': 1, 'name': 'Resource 1', 'start-date': testDate, 'end-date': new Date(testDate.getDate() + 1) }] })

    it('should have an empty table head cell component as first component', () => {
      expect(wrapper.find('th').text()).toBe('')
    })
  })

})