import drag from './drag'

const install = function (Vue) {
  Vue.directive('d-dialog-drag', drag)
}

if (window.Vue) {
  window['d-dialog-drag'] = drag
  Vue.use(install) // eslint-disable-line
}

drag.install = install
export default drag
