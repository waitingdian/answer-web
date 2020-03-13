<template>
  <div class="error-page">
    <div class="error-wraper">
      <p class="fs-32 text-black" style="letter-spacing: 2px;">404</p>
      <p class="f38 p-t-20">很抱歉，页面不小心迷路了！</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'error',
    props: ['error'],
    components: {
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .error-page{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 1200px;
    .error-wraper{
      width: 300px;
      margin: 120px auto;
      text-align: center;
    }
  }
</style>
