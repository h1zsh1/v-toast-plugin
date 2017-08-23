/**
 * 回到顶部插件
 * 在页面组价中加 v-toTop 指令即可
 */
import toTopT from './toTop.vue'
let toTop = {}
toTop.install = function (Vue) {
  Vue.directive('toTop', {
    bind: function (el, binding, vnode, oldVnode) {
      // console.log('我是初始化')
      let ToTopTp = Vue.extend(toTopT)
      let tpl = new ToTopTp().$mount().$el  // 创建实例，挂载到文档以后的地方
      el.appendChild(tpl)   // 把创建的实例添加到文档中
    }
  })
}
export default toTop
