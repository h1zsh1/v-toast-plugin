
/**
* 组件调用 this.$alert(errorCode, alertType, text)
 * **
 * errorCode 请求返回的错误状态码 string
 * alertType 谈出框类型  num  （0 1 2）
 * 类型 0 不弹出提示界面 执行s函数后 then函数的第一个参数是个对象 {status: （布尔，是否是正确状态）, msg: （字符串，提示文本内容）}
 * 类型 1 弹出提示界面  2S 后弹出层自动关闭 执行函数后 then函数的第一个参数是个对象 {status: （布尔，是否是正确状态）, msg: （字符串，提示文本内容）}
 * 类型 2 弹出提示界面带有确定按钮  只有点击确定后 执行函数 then函数的第一个参数是个对象 {status: （布尔，是否是正确状态）, msg: （字符串，提示文本内容）}
 * text 自定义弹出提示文本   string
 * */
import {DispatchMsg} from './dispatchErrorMsg'
let Toast = {}
Toast.install = function (Vue, initObj) {
  console.log(initObj)
  Vue.prototype.$Toast = function (errorCode, alertType, text, selfComponent) {
    return new Promise((resolve, reject) => {
      let dispatchMsg = new DispatchMsg(errorCode, alertType, text, selfComponent, Vue, initObj)
      dispatchMsg.show().then(res => {
        resolve(res)
      })
    })
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(paykeyboard)
}
export default Toast
