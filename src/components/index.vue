<template>
<div>
      

  <top ></top>
   
  <div class="aaa">
    <scroll ref="scroll" class="aaa-content" >
        <div>
           
          <contents></contents> 
          <hour></hour>
          <hebdomad></hebdomad>
          <seven-days></seven-days>
          <lifeExponent></lifeExponent>
         
          <div style="height:380px;"></div>
         
        </div>
  </scroll>
  </div>
      	         

  </div>
</template>

<script>
import top from 'components/top'

import Scroll from 'base/scroll/scroll'
import contents from "components/contents"
import hebdomad from "components/hebdomad"
import lifeExponent from "components/lifeExponent"
import hour from "components/hour"
import sevenDays from "components/sevenDays"


export default {
  data(){
    return {
            

    }
  },

  components: {
    Scroll,
    contents,
    hebdomad,
    lifeExponent,
    hour,
    sevenDays,
    top,
  
  },
 
  
}
</script>

<style lang="scss" scoped>

  .aaa{
      position: fixed;
      width: 100%;
      top: 40px;
      bottom: 0;
  }
    .aaa-content{
      height: 100%;
      overflow: hidden;
    }
      
</style>