<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="toast" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn" @click.stop.prevent="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    },
    pattern: {
      type: String,
      default: 'success'
    }
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  },
  created () {
    console.log(this.pattern)
  },
  mounted () {
    this.createTimer()
  },
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        top: `${this.verticalOffset}px`
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    }
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
</script>

<style scoped>
.toast {
  display: flex;
  flex-wrap: wrap;
  background-color: #303030;
  color: #fff;
  align-items: center;
  padding: 20px;
  position: fixed;
  min-width: 280px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .2);
  transition: all .3s;
}
.content {
  padding: 0;
}
.btn {
  color: #ff4081;
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
</style>
