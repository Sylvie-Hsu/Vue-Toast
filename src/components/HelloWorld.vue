<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <button class="toastify" @click="clickSuccess">Success</button>
    <button class="toastify" @click="clickAlert">Alert</button>
    <button class="toastify" @click="clickError">Error</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'a simple vue-toast component'
    }
  },
  methods: {
    clickSuccess () {
      this.$toast.success('联系人添加成功')
    },
    clickAlert () {
      this.$toast.alert('服务器繁忙，请稍后再试')
    },
    clickError () {
      this.$toast.error('错误操作提示文本')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.toastify {
  background: #0dc2b3;
  color: #fff;
  border: none;
  padding: 7px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.toastify:hover {
  opacity: .9;
}
</style>
