// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from './plugins/Toast'
import {CODE_LIST, MSG_LIST} from './assets/js/codeFilter'
Vue.use(Toast, {codeList: CODE_LIST, msgList: MSG_LIST, rightCode: ['0'], showTime: 2000})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
