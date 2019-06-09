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
  
        it('should be of type Number', () => {
          expect(dateProp.type).toBe(Date)
        })
  
        
        it('should have default value 0', () => {
          expect(dateProp.default().getDate()).toBe(new Date().getDate())
        })
        

        it('should be required', () => {
          expect(dateProp.required).toBeFalsy()
        })
      })
      
      describe('should have computed prop for the array of dates to be rendered', () => {
        const wrapper = componentFactory()
        const datesCompProp = wrapper.vm.dates
        const thisMock = { renderDays: 13, date: new Date()}
  
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
    })    

    describe('test minimal rendering of the component', () => {
        const wrapper = componentFactory()

        it('should render a th with 1', () => {
            expect(wrapper.find(TableHeadCell).is(TableHeadCell)).toBe(true)
        })
    })

    describe('method to compare provided date to selected one', () => {
      const testDate = new Date()
      const wrapper = componentFactory({date: testDate})

      it('should return true if dates are equal', () => {
          expect(wrapper.vm.equalsSelectedDate(testDate)).toBe(true)
      })

      it('should return false if dates are not equal', () => {
        const newDate = new Date(testDate.getDate() + 1)
        expect(wrapper.vm.equalsSelectedDate(newDate)).toBe(false)
    })

  })
})