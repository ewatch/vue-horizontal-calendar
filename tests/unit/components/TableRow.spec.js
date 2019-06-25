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

        describe('should have amountOfCells prop', () => {
            const wrapper = componentFactory()
            const amountOfCells = wrapper.vm.$options.props.amountOfCells
      
            it('should be of type Number', () => {
              expect(amountOfCells.type).toBe(Number)
            })
          })
    })

    describe('rendering of component properties', () => {
        it('should render title', () => {
          const wrapper = componentFactory({"title": "Test"})
          
          expect(wrapper.html()).toContain('Test')
        })
        
        it('should render a tr-tag', () => {
            const wrapper = componentFactory({"title": "Test"})
            
            expect(wrapper.findAll('tr').length).toEqual(1)
        })
  

        it('should render a certain amount of td-tags', () => {
            const wrapper = componentFactory({"title": "Test", "amountOfCells": 5})
            
            expect(wrapper.findAll('td').length).toEqual(6)
          })
    })


})