import elementResizeDetectorMaker from 'element-resize-detector'
import { debounce } from '@/js/libs'
const erd = elementResizeDetectorMaker()
const resize = {}

resize.install = Vue => {
  Vue.directive('resize', {
    bind(el, binding) {
      erd.listenTo(
        el,
        debounce(element => {
          const arr = (element.getAttribute('last') || ',').split(',')
          const width = element.offsetWidth
          const height = element.offsetHeight
          if (
            (arr.length === 2 && arr[0] * 1 !== width * 1) ||
            !arr[1] * 1 === height * 1
          ) {
            element.setAttribute('last', `${width},${height}`)
            binding.value({ width, height })
          }
        }, 16.7)
      )
    },
    unbind(el) {
      try {
        erd.uninstall(el)
      } catch (error) {
        // console.log(error)
      }
    }
  })
}

export default resize
