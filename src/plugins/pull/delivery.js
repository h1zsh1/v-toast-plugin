import Loading from './loading.vue'
export class Peacemaker {
  constructor (textStyle, text, imgStyle, imgSrc) {
    /* 提示文本样式 */
    this.text_style = textStyle || {'font-size': '3rem', color: '#666', background: '#fafafa', padding: '20px 0', width: '100%'}
    /* 提示文本样式 */
    this.text = text || ['上拉刷新', '没有内容了']
    /* 图片样式 */
    this.img_style = imgStyle || {}
    /* 图片地址 */
    this.img_src = imgSrc || ''
    this.ID_NAME = 'pull-' + this.generateMixed(4)
    this.cb = null
    this.list_length = 0
    this.noContent = false
    this.op = 0 // pc端 默认监听 document滚动条  1 为监听自身
    this.del = false // 是否删除实例
    this.reset = false // 激活执行函数
  }
  // 创建loading
  createLoading (el, Vue) {
    // this.showLoading(this.ID_NAME)
    let Load = Vue.extend(Loading)
    let loadTmp = new Load()
    loadTmp.peacemaker = el.peacemaker
    let tpl = loadTmp.$mount().$el
    el.appendChild(tpl)
    loadTmp._addListener()
  }
  generateMixed (n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let res = ''
    for (let i = 0; i < n; i++) {
      let id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  }
}
