<template>
  <div class="toTop">
    <a href="javascript:;" v-if="showTOTOP" class="top" id="toTop" @click="toTop"><img src="./css/toTop.png" alt="" class="icon-toTop"></a>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showTOTOP: true
      }
    },
    mounted () {
      let self = this
      if (document.body.scrollTop > 0) {
        self.showTOTOP = true
      } else {
        self.showTOTOP = false
      }
      document.addEventListener('scroll', () => {
        if (document.body.scrollTop > 0) {
          self.showTOTOP = true
        } else {
          self.showTOTOP = false
        }
      })
    },
    methods: {
      toTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
<style  lang="scss" rel="stylesheet/scss">
  .toTop{
    width: 44px;
    padding: 0 5px 0;
    box-shadow: 0 0 10px rgba(213,213,213,1);
    position: fixed;
    right: 20px;
    bottom: 130px;
    background: #fff;
    border-radius: 4px;
    z-index: 1000;
    a{
      display: inline-block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      box-sizing: border-box;
    }
    .top{
      box-sizing: border-box;
      padding-top: 3px;
      .icon-toTop{
        display: inline-block;
        width: 20px;
        height: 20px;
        color: #000;
      }
    }
  }

</style>

