<template>
  <div class="hello">
    <h2>toast demo</h2>
    <span>默认</span>
    <ul>
      <li @click="_test(1)">方式一：做code码验证，不弹出</li>
      <li @click="_test(2)">方式二：做code码验证，弹出，定时结束后消失，正确操作提示</li>
      <li @click="_test(3)">方式三：做code码验证，弹出，定时结束后消失，正确操作提示，自定义提示内容</li>
      <li @click="_test(4)">方式四：做code码验证，弹出，定时结束后消失，错误操作提示</li>
      <li @click="_test(5)">方式五：做code码验证，弹出，定时结束后消失，错误操作提示，自定义提示内容</li>
      <li @click="_test(6)">方式六：做code码验证，弹出，选择提示</li>
      <li @click="_test(7)">方式七：做code码验证，弹出，选择提示，自定义提示标题</li>
      <li @click="_test(8)">方式八：做code码验证，弹出，选择提示，自定义提示内容</li>
      <li @click="_test(9)">方式九：做code码验证，弹出，选择提示，自定义提示标题和内容</li>
    </ul>
    <span>自定义</span>
    <ul>
      <li @click="_test(10)">自定义的弹出组件</li>
    </ul>
    <span>返回参数</span>
    <div>{{resData}}</div>
  </div>
</template>

<script>
  import myToast from './myToast.vue'
  export default {
    name: 'hello',
    data () {
      return {
        resData: null
      }
    },
    methods: {
      _test (type) {
        this.resData = null
        if (type === 1) {
          this.$Toast('3', 0).then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 2) {
          this.$Toast('0', 1).then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 3) {
          this.$Toast('0', 1, '操作正确').then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 4) {
          this.$Toast('1', 1).then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 5) {
          this.$Toast('1', 1, '操作错误').then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 6) {
          this.$Toast('2', 2).then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 7) {
          this.$Toast('2', 2, '[title:]警告').then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 8) {
          this.$Toast('2', 2, '一旦确认，数据不可恢复').then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 9) {
          this.$Toast('2', 2, '一旦确认，数据不可恢复[title:]警告').then(res => {
            console.log(res)
            this.resData = res
          })
        }
        if (type === 10) {
          this.$Toast('0', 1, '', myToast).then(res => {
            console.log(res)
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    text-align: left;
    margin: 0 10px;
    color: #42b983;
    cursor: pointer;
  }

</style>
