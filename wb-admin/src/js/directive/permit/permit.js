import checkPermit from '@/js/libs/permit.js'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding

    if (!checkPermit(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
