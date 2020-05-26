<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Hello World'
    }
  }
}
</script>

<style lang="stylus">
#app
  font-size 20px
  font-family 'Roboto', sans-serif
  color blue
</style>
