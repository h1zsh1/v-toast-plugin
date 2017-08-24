/**
* errorCode 请求返回的错误状态码 string
* alertType 谈出框类型  num  （0 1 2）
 * 类型 0 不弹出提示界面 执行show函数后 then函数的第一个参数是个对象 {status: （布尔，是否是正确状态）, msg: （字符串，提示文本内容）}
 * 类型 1 弹出提示界面  2S 后弹出层自动关闭 执行show函数后 then函数的第一个参数是个对象 {status: （布尔，是否是正确状态）, msg: （字符串，提示文本内容）}
 * 类型 2 弹出提示界面带有确定按钮  只有点击确定后 执行show函数 then函数的第一个参数是个对象 {status: （布尔，是否是正确状态）, msg: （字符串，提示文本内容）}
 * 类型 3 自定义组件 （详细查看 replyNotice组件） 功能： 以promise的方式返回true或者false
 * text 自定义弹出提示文本   string
 * */
import toastBox from './Toast.vue'
export let propsData = {
  title: '提示', // 标题
  msg: '', // 文本内容
  type: 0, // 弹出类型
  status: false // 提示状态
}
export class DispatchMsg {
  constructor (errorCode, alertType, text, selfComponent, Vue, initObj) {
    this.Vue = Vue
    this.errorCode = errorCode || ''
    this.text = text || ''
    if (text && alertType === 2) {
      let arr = text.split('[title:]')
      this.text = arr[0] || ''
      propsData.title = arr[1] || '提示'
    } else {
      this.text = text || ''
    }
    this.alertType = alertType || 0
    this.box = selfComponent || toastBox
    this.codeList = initObj.codeList
    this.msgList = initObj.msgList
    this.rightCode = initObj.rightCode
    this.showTime = initObj.showTime || 1800
  }
  show () {
    return new Promise((resolve, reject) => {
      let code = false
      let self = this
      if (this.rightCode.indexOf(this.errorCode) !== -1) {
        code = true
      }
      propsData.type = this.alertType
      let tpl
      switch (this.alertType) {
        case 0:
          resolve({status: code, msg: this._checkMsg()})
          break
        case 1:
          propsData.msg = self._checkMsg()
          propsData.status = code
          tpl = this._createVueTmp()
          setTimeout(function () {        // 延迟2秒后移除该提示
            document.body.removeChild(tpl)
            resolve({status: code, msg: self._checkMsg()})
            self._resetProps()
          }, this.showTime)
          break
        case 2:
          propsData.msg = self._checkMsg()
          propsData.status = code
          this.box.methods.emitConfirm = function () {
            resolve({btn: 'confirm', data: {status: code, msg: self._checkMsg()}})
            self._resetProps()
          }
          this.box.methods.emitAbolish = function () {
            resolve({btn: 'abolish', data: {status: code, msg: self._checkMsg()}})
            self._resetProps()
          }
          this._createVueTmp()
          break
      }
    })
  }
  _createVueTmp () {
    let ToastTmp = this.Vue.extend(this.box)
    let toastTmp = new ToastTmp()
    toastTmp.propsData = propsData
    let tpl = toastTmp.$mount().$el
    document.body.appendChild(tpl)
    return tpl
  }
  _checkMsg () {
    let msgText = ''
    if (this.text === '') {
      for (let i = 0; i < this.codeList.length; i++) {
        if (this.codeList[i] === this.errorCode) {
          msgText = this.msgList[i]
          break
        }
      }
    } else {
      msgText = this.text
    }
    return msgText === '' ? '没有匹配到状态码' : msgText
  }
  _resetProps () {
    propsData.title = '提示'
    propsData.msg = ''
    propsData.type = 0
    propsData.status = false
  }
}

