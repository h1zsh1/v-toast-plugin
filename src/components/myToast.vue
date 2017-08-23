<template>
  <div class="alert-modal-wrapper">
    <div class="alert-modal-container">
      <div class="alert-modal-header">
        <img src="../assets/img/right.svg" alt="" v-if="propsData.status">
        <img src="../assets/img/wrong.svg" alt="" v-else>
      </div>
      <div class="alert-modal-body">{{propsData.msg}}</div>
      <div class="alert-footer" v-if="propsData.type === 2">
        <div class="btn-c" @click="_close">取消</div>
        <div class="btn-d" @click="_doThing">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['propsData'],
    data () {
      return {
      }
    },
    mounted () {
      this.stopScroll()
    },
    methods: {
      _doThing () {
        if (this.emitConfirm) {
          this.emitConfirm()
        }
        this._close()
      },
      _close () {
        document.body.removeChild(this.$el)
      },
      stopScroll () {
        // 判断浏览器
        let isIE = navigator.userAgent.match(/MSIE (\d)/i)
        isIE = isIE ? isIE[1] : undefined
        let isFF = /FireFox/i.test(navigator.userAgent)
        // 获取元素
        let counter = this.$el
        // 鼠标滚轮事件
        if (isIE < 9) {
          counter.attachEvent('onmousewheel', function () {
            // 阻止浏览器默认方法
            return false
          })
        } else if (!isFF) { // 除火狐外的现代浏览器也使用MouseWheel事件
          counter.addEventListener('mousewheel', function (e) {
            // 阻止浏览器默认方法
            e.preventDefault()
          }, false)
        } else { // 火狐使用DOMMouseScroll事件
          counter.addEventListener('DOMMouseScroll', function (e) {
            // 阻止浏览器默认方法
            e.preventDefault()
          }, false)
        }
      }
    },
    components: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .alert-modal-wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .alert-modal-container{
      width: 240px;
      background: #fff;
      border-radius: 3px;
      position: relative;
      .close{
        display: block;
        width: 20px;
        position: absolute;
        right: -28px;
        top: 0;
        cursor: pointer;
      }
      .alert-modal-header{
        img{
          display: block;
          width: 30%;
          margin: 10px auto;
        }
      }
      .alert-modal-body{
        line-height: 1.5;
        font-weight: 800;
        color: #333;
        font-size: 18px;
        padding: 15px 15px 25px;
        text-align: center;
      }
    }
    .alert-footer{
      margin: 0 auto 10px;
      height: 36px;
      text-align: center;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .btn-c{
        width: 54px;
        border-radius: 3px;
        background-color: #999;
        padding: 6px 10px;
        &:hover{
          opacity: .8;
        }
      }
      .btn-d{
        width: 54px;
        border-radius: 3px;
        padding: 6px 10px;
        background-color: #006361;
        &:hover{
          opacity: .8;
        }
      }
    }
  }
</style>
