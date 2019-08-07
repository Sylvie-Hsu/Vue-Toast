<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="toast" :class="pattern" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
      <img class="icon" :src="icon" />
      <span class="content">{{content}}</span>
      <!-- <a class="btn" @click.stop.prevent="handleClose">-</a> -->
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
    pattern: {
      type: String,
      default: 'success'
    }
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 5000,
      height: 0,
      visible: false,
      icon: require('../../assets/' + this.pattern + '.svg')
    }
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
  align-items: center;
  font-size: 10px;
  padding: 10px;
  position: fixed;
  min-width: 200px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .1), 0 3px 5px 0 rgba(0, 0, 0, .1);
  transition: all .5s;
  border-radius: 2px;
}
.success {
  background-color: #EDFAF3;
  color: #005238;
}
.error {
  background-color: #FFF5F2;
  color: #660E16;
}
.alert {
  background-color:#FFF9E6;
  color: #592D00;
}
.icon {
  height: 16px;
  width: 16px;
  margin: 0 5px 0 5px;
}
.content {
  padding: 0;
}
.btn {
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
</style>
