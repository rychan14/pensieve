<template>
  <div id="pensieve">
    {{ message }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Pensieve'
    }
  }
}
</script>

<style lang="stylus" scoped>
:root
  --hspacing 50px

#pensieve
  font-size 20px
  font-family 'Roboto', sans-serif
  padding var(--hspacing)
</style>
