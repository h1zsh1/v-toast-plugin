import Vue from 'vue'
import App from './App.vue'
import Toast from './lib/index'
import {CODE_LIST, MSG_LIST} from './assets/js/codeFilter'
Vue.use(Toast, {codeList: CODE_LIST, msgList: MSG_LIST, rightCode: ['0'], showTime: 2000})
new Vue({
  el: '#app',
  render: h => h(App)
})
