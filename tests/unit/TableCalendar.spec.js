import { shallowMount } from "@vue/test-utils"
import TableCalendar from "@/components/TableCalendar.vue"
import TableHeadCell from "@/components/TableHeadCell.vue"

const dayOfMonth = 1
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

    describe('test minimal rendering of the component', () => {
        const wrapper = componentFactory()

        it('should render a th with 1', () => {
            expect(wrapper.find(TableHeadCell).is(TableHeadCell)).toBe(true)
        })
    })
})