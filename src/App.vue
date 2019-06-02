<template>
  <div id="app">
    		 <transition mode="out-in">

   <router-view></router-view>
    		 </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app{
  color: #fff;
 

}

.v-enter,
    .v-leave-to {
      opacity: 0;
      /* transform: translateX(150px); */
    }

    .v-enter-active,
    .v-leave-active {
      transition: all 0.1s ease;
    }
</style>
