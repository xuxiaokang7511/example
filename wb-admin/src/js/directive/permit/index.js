import permit from './permit'

const install = function(Vue) {
  Vue.directive('permit', permit)
}

if (window.Vue) {
  window['permit'] = permit
  Vue.use(install) // eslint-disable-line
}

permit.install = install
export default permit
