<template>
  <ul class="top">
      <span class="iconfont" v-html="goBack" @click="goBacks"></span>
      <h1>指尖天气</h1>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['goBack'],
    methods:{
        goBacks () {
          this.$router.go(-1)
        }
  }
  }
</script>

<style lang="scss" scoped>


.top{
      height: 40px;
      width: 100%;
      text-align: center;
   
      line-height: 40px;
      background: rgba(0,0,0,0.3);
      span{
        float: left;
        position: absolute; 
        left: 10px;
      }
    }
</style>