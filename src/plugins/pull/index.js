
import {Peacemaker} from './delivery'
let pull = {}
pull.install = function (Vue, op) {
  let peacemaker
  Vue.directive('pull', {
    bind: function (el, binding, vnode, oldVnode) {
      peacemaker = new Peacemaker()
      for (let property in op) {
        if (property !== 'SHOW_TEXT' && property !== 'IS_SHOW') {
          if (peacemaker[property]) {
            peacemaker[property] = op[property]
          }
        }
      }
      peacemaker.cb = binding.value.fn
      peacemaker.list_length = binding.value.flag
      el.peacemaker = peacemaker
      el.id = peacemaker.ID_NAME + '-' + peacemaker.op
      let vComponent = vnode.context
      vComponent.$pull_loading_close = function () {
        el.peacemaker.noContent = true
      }
      vComponent.$pull_loading_open = function () {
        el.peacemaker.noContent = false
      }
      vComponent.$pull_loading_reset = function () {
        el.peacemaker.reset = true
      }
      Vue.prototype.$pull_loading_close = function () {}
      Vue.prototype.$pull_loading_open = function () {}
      Vue.prototype.$pull_loading_reset = function () {}
    },
    inserted (el, binding, vnode, oldVnode) {
      el.peacemaker.createLoading(el, Vue)
    },
    componentUpdated: function (el, binding, vnode, oldVnode) {
      el.peacemaker.list_length = binding.value.flag
    },
    // 指令解绑
    unbind (el, binding, vnode, oldVnode) {
      el.peacemaker.del = true
    }
  })
}
export default pull
