<template>
  <div :id="peacemaker.ID_NAME" v-show="is_show" class="pull-loading" :data_type="peacemaker.op">
    <div :style="peacemaker.text_style" v-show="show_text && !no_content">{{peacemaker.text[0]}}</div>
    <div :style="peacemaker.text_style" v-show="no_content && !isHide">{{peacemaker.text[1] || ''}}</div>
    <img :style="peacemaker.img_style" v-show="!show_text && !no_content"
         :src="peacemaker.img_src === '' ? src : peacemaker.img_src" alt="" >
  </div>
</template>

<script>
  import src from './images/loading.svg'
  export default {
    props: ['peacemaker'],
    data () {
      return {
        src: src,
        is_show: false,
        show_text: false,
        no_content: false,
        listLength: 0,
        isHide: false
      }
    },
    computed: {
    },
    created () {
    },
    mounted () {
    },
    watch: {
      peacemaker: {
        handler: function (val, oldVal) {
          // console.log(val, oldVal, '&&&&&')
          this.is_show = true
          if (this.listLength !== val.list_length) {
           // console.log('aaaaaaa', this.calculatedHeigh())
            // 计算位置
            let self = this
            setTimeout(function () {
              self.$el.parentNode.appendChild(self.$el)
              if (self.calculatedHeigh()) {
                // 在可见范围 且没有被关闭执行
                if (!self.show_text && !val.noContent) {
                  if (document.getElementById(`${self.peacemaker.ID_NAME}-${self.peacemaker.op}`)) {
                    val.cb(true)
                  }
                }
                self.show_text = false
                // val.cb(true)
              } else {
                // 不在在可见范围
                self.show_text = true
                // val.cb(false)
              }
            })
            this.listLength = val.list_length
          }
          // 是否实例被摧毁
          if (val.del) {
            this._removeListener()
            this.$el.remove()
          }
          // 执行关闭函数
          if (val.noContent) {
            this.no_content = true
            if (this.peacemaker.list_length === 0) {
              this.isHide = true
            }
            this._removeListener()
          } else {
            this.isHide = false
            if (this.no_content) {
              this.no_content = false
              this._reset()
            }
          }
          if (val.reset) {
            if (!this.no_content && this.calculatedHeigh() && val.list_length !== 0) {
              val.cb(true)
            }
            val.reset = false
          }
        },
        deep: true
      },
      show_text: function (val, old) {
        if (val) {
          // 设置监听
          this._addListener()
          this.peacemaker.cb(false)
        } else {
          // 取消监听
          this._removeListener()
          if (document.getElementById(`${this.peacemaker.ID_NAME}-${this.peacemaker.op}`)) {
            this.peacemaker.cb(true)
          }
        }
      }
    },
    methods: {
      _reset () {
        // 重置
        this.peacemaker.list_length = 0
        this.is_show = true
        this.show_text = false
        this.listLength = 0
        this.peacemaker.del = false
      },
      calculatedHeigh () {
        // this.peacemaker.showLoading(this.peacemaker.ID_NAME)
        // console.log(this.$el.parentNode, this.$el, '&&&&&&&&&')
        let H = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        if (H >= this.$el.offsetTop - this.getScrollTop() + this.$el.offsetHeight) {
          /* console.log('出现在视线') */
          return true
        } else {
          /* console.log('没有出现在视线') */
          return false
        }
      },
      getScrollTop () {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      },
      _winScroll () {
        // console.log(this.peacemaker.ID_NAME, '滚动监听')
        if (document.getElementById(`${this.peacemaker.ID_NAME}-${this.peacemaker.op}`)) {
          if (this.calculatedHeigh()) {
            // 在可见范围
            this.show_text = false
            // this.peacemaker.cb(true)
          } else {
            // 不在在可见范围
            this.show_text = true
            // this.peacemaker.cb(false)
          }
        }
      },
      _removeListener () {
        // 取消监听
        document.removeEventListener('scroll', this._winScroll, false)
      },
      _addListener () {
        // console.log(this, '我是绑定监听', this.peacemaker.noContent)
        // 设置监听
        if (!this.peacemaker.noContent) {
          document.addEventListener('scroll', this._winScroll, false)
        }
      }
    }
  }
</script>

<style lang="scss">
  .pull-loading{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 30px;
  }
  .pull-loading img {
    width: 10%;
  }
</style>
