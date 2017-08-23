##vue插件目录

myAlert

简述：一个根据后端返回errorcode状态码，做自动匹配的自定义alert弹出框（也可自定义做验证提示框）
用法：
          this.$alert（code,  status,  text ）.then (res => {})
          code: 字符串 （必须）   errorcode状态码
          status: 整数  （必须）    0, 1, 2
          text: 字符串（非必须）   自定义提示文本
          res: 对象       {status: (提示类型，true正确提示类型, false错误提示类型), msg: (提示的文本内容)}
应用场景：
          1, 只做判断，不进行弹出提示
              this.$alert(errorcode, 0).then（res => {}）
          2, 弹出提示，2秒后自动消失
              this.$alert(errorcode, 1).then（res => {}）
          3, 弹出提示，2秒后自动消失, 自定义提示
              this.$alert('', 1, '输入内容有误').then（res => {}）
              this.$alert('0', 1, '输入内容正确').then（res => {}）
          4, 弹出提示，出现确定按钮， 按钮点击后关闭弹出窗并执行then（res => {}）
              this.$alert(errorcode,  2).then（res => {}）

toTop

简述：一个让滚动条回到顶部的vue自定义指令
用法：在需要用的页面中，找到所对应的vue组件添加“v-toTop”指令即可 （例：工程目录下view -> index -> index.vue）

pull

简述：自动刷新数据插件，pc端向上滚动滚动条，移动端向上滑动页面触发
用法：在需要用的vue组件添加“v-pull”指令, v-pull="{fn: 更新数据列表的函数  ,flag: 数据列表的长度}" ，在请求数据列表到最大量没有新数据时候，
     你需要调用 this.$pull_loading_close() 方法终结数据自动更新  （参考： view -> search -> users -> index.vue）。
     注册插件时，可以自定义 提示文本的内容，样式

     Vue.use(Pull, {
       text: ['向上滚动加载更多'],
       text_style: {
         'font-size': '0.8rem',
         color: '#666',
         padding: '10px 0'
       }
     })

