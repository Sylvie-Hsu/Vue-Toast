<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <button class="toastify" @click="clickToastify">Toast</button>
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
    clickToastify () {
      this.toast({
        content: 'this is a toast'
      })
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
