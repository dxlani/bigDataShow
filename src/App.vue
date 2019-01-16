<template>
  <div id="app">
     <!-- <transition name="rotate-fall">
        <router-view></router-view>
     </transition> -->
        <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
 import 'vue-transition.css'

export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
    
#app {
	position: relative;
	top: 0px;
	bottom: 0px;
	width: 100%;
  height: 100%;
}

</style>