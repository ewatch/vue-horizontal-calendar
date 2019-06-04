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

describe('CharacterCounter.vue', () => {
    it('exists', () => {
      const wrapper = componentFactory()
  
      expect(wrapper).toBeDefined()
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
      
      describe('should have computed prop', () => {
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
})