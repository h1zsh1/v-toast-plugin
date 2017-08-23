<template>
  <div :class="{'alert-modal-wrapper': true, 'box-background-color': propsData.type === 2}">
    <div class="text-box-wrapper" v-if="propsData.type === 1">
      <div :class="{'text-box': true, 'text-box-error': !propsData.status}">{{propsData.msg}}</div>
    </div>
    <div class="alert-modal-container" v-if="propsData.type === 2">
      <div class="alert-modal-header">
        {{propsData.title}}
      </div>
      <div class="alert-modal-body">{{propsData.msg}}</div>
      <div class="alert-footer" v-if="propsData.type === 2">
        <div class="btn-c btn-style" @click="_abolish">取消</div>
        <div class="btn-d btn-style" @click="_confirm">确定</div>
      </div>
      <div class="close close-m icon-close" @click="_close">
        <img src="./img/icon_close.svg" alt="">
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
    computed: {},
    watch: {},
    filters: {},
    mounted () {
      this.stopScroll()
    },
    methods: {
      _confirm () {
        if (this.emitConfirm) {
          this.emitConfirm()
        }
        this._close()
      },
      _abolish () {
        if (this.emitAbolish) {
          this.emitAbolish()
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
.box-background-color{
  background-color: rgba(0, 0, 0, 0.5);
}
.alert-modal-wrapper{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  @keyframes myAnimate
  {
    from {padding-top: 0; opacity: 0;}
    to {tpadding-top: 61px; opacity: 1;}
  }
  .text-box-wrapper{
    align-self: flex-start;
    padding-top: 61px;
    opacity: 1;
    animation: myAnimate .3s;
    .text-box{
      min-width: 336px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 3px;
      font-size: 16px;
      color: #fff;
      background: #05a09d;
      box-shadow: 0 6px 8px rgba(0, 128, 125, 0.2);
    }
    .text-box-error{
      color: #FE3B2F;
      background: #fff;
      border: 1px solid rgba(254, 59, 47, 0.4);
      box-shadow: 0 6px 8px rgba(254, 59, 47, 0.2);
    }
  }
  .alert-modal-container{
    background-color: #fff;
    position: relative;
    border-radius: 3px;
    box-sizing: border-box;
    width: 420px;
    padding: 40px 20px 30px;
    .close{
      font-size: 0;
      position: absolute;
      right: -32px;
      top: 0;
      cursor: pointer;
    }
    .alert-modal-header{
      text-align: center;
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
    .alert-modal-body{
      line-height: 1.5;
      color: #333;
      font-size: 18px;
      padding: 30px 0;
      text-align: center;
    }
  }
  .alert-footer{
    display: flex;
    .btn-style{
      width: 182px;
      font-size: 16px;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
      user-select: none;
    }
    .btn-c{
      color: #999;
      border: 1px solid #e1e1e1;
      background: transparent;
      margin-right: 16px;
      &:hover{
        opacity: .8;
      }
    }
    .btn-d{
      color: #fff;
      border: none;
      background: #00807d;
      &:hover{
        opacity: .8;
      }
    }
  }
}
</style>
