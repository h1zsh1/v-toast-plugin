# v-toast-plugin

> 这是一个vue插件

## 怎样使用

``` bash
# npm 安装
npm install v-toast-plugin --save-dev

# 在入口js文件引用
import Toast from 'v-toast-plugin'

# 注册插件
Vue.use(Toast, config(配置))

# 在vue组件中使用
this.$Toast(code, type, msg, vueComponent).then(res => { // 后续代码逻辑})

参数code(状态码【字符串】必须), type(弹出类型【整数0，1，2】必须), msg(自定义提示文本/标题【字符串】选填), vueComponent(自定义提示组件【vue组价对象】选填)

# 使用场景
场景1，做code码验证，不弹出

this.$Toast('3', 0).then(res => {// 后续代码逻辑})

场景2，做code码验证，弹出，定时结束后消失，正确操作提示

this.$Toast('200', 1).then(res => {// 后续代码逻辑})

场景3，做code码验证，弹出，定时结束后消失，正确操作提示，自定义提示内容

this.$Toast('200', 1, '操作正确').then(res => {// 后续代码逻辑})

场景4，做code码验证，弹出，定时结束后消失，错误操作提示

this.$Toast('404', 1).then(res => {// 后续代码逻辑})

场景5，做code码验证，弹出，定时结束后消失，错误操作提示，自定义提示内容

this.$Toast('404', 1, '操作错误').then(res => {// 后续代码逻辑})

场景6，做code码验证，弹出，选择提示

this.$Toast('200', 2).then(res => {// 后续代码逻辑})

场景7，做code码验证，弹出，选择提示，自定义提示标题

this.$Toast('200', 2, '[title:]警告').then(res => {// 后续代码逻辑})

场景8，做code码验证，弹出，选择提示，自定义提示内容

this.$Toast('200', 2, '一旦确认，数据不可恢复').then(res => {// 后续代码逻辑})

场景9，做code码验证，弹出，选择提示，自定义提示标题和内容

this.$Toast('200', 2, '一旦确认，数据不可恢复[title:]警告').then(res => {// 后续代码逻辑})

# 如果您不喜欢默认的提示样式和方式，您可以自己定制自己的提示组件，以上9个场景都可以用自己的组件实现，只需要在this.$Toast函数的第四个参数传入您自己的组件
例如：this.$Toast('200', 1, '这是我自己的组件', myVueComponent).then(res => {// 后续代码逻辑})

自定义组件的约定：

您需要在组件的props中声明一个'propsData'，插件会把一个对象赋值给propsData。

对象的属性有status(提示状态，布尔，true正确提示，false错误提示)，title(提示标题，字符串), msg(提示内容， 字符串), type(提示类型，整数0，1，2)

您可以根据propsData的数值编写自己的组件逻辑

插件在type = 2时候，默认会给您的组件提供两个执行函数emitConfirm（点击确定时可供调用）， emitAbolish（点击取消时可供调用）

工程目录src/myToast.vue可供参考

```


## config配置对象

> 这是插件的初始化配置对象，它有codeList，msgList, rightCode, showTime；四个属性

``` bash
# codeList（必须）类型：数组
状态码列表，它是一个数组，成员为字符串类型数据。例如：['200', '500', '404', ...]

# msgList（必须）类型：数组
匹配到的状态码对应提示文本列表，它是一个数组，成员为字符串类型数据。例如：['返回成功', '服务器出错了', '网络错误', ...]

# rightCode（必须）类型：数组
正确提示状态码列表，它是一个数组，成员为字符串类型数据。例如：['200']

# showTime（选填）类型：整数
提示框显示的时间，它是一个整数，例如：2000（2秒）
```
