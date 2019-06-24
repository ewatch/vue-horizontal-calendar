import { shallowMount } from "@vue/test-utils"
import TableRow from "@/components/TableRow.vue"


const componentFactory = (propsData) => {
    return shallowMount(TableRow, {
      propsData: {
        ...propsData
      }
    })
  }

  describe('TableRow.vue', () => {
    it('exists', () => {
      const wrapper = componentFactory()
  
      expect(wrapper).toBeDefined()
    })

    describe('test properties', () => {
        describe('should have title prop', () => {
          const wrapper = componentFactory()
          const title = wrapper.vm.$options.props.title
    
          it('should be of type String', () => {
            expect(title.type).toBe(String)
          })
        })
    })

    describe('rendering of component properties', () => {
        it('should render title', () => {
          const wrapper = componentFactory({"title": "Test"})
          
          expect(wrapper.html()).toContain('Test')
        })
    })


})