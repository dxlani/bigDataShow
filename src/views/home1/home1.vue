<template>
    <div class="app" id="xx">
    <transition name="rotate-flip-bottom">
        <router-view class="app-router-view"></router-view>
     </transition>
     </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import 'vue-transition.css'
@Component({
  components:{
  }
})
export default class home extends Vue {
  mounted() {
      var that=this;
      var div=document.getElementsByClassName('app')[0] as any;
      div.onmousedown=function(e){  
        var a1=e.screenX;
        div.onmouseup=function(e){
        var a2=e.screenX;
        if(a1>a2){
          console.log("左滑啊");
          that.$router.push('./slide1')
          }
        if(a1<a2){
          console.log("右滑啊");
          that.$router.push('./slide3')
          }
        }
      }
    }
  }
</script>

<style >
/* https://webcodefarmer.github.io/vue-transition.css/dist/index.html#/rotateSides */
 /* 给页面加上以下样式，动画才能生效 */
  html,
  body,
  .app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .app {
    background-color: #000;
    perspective: 1200px;
  }

  .app .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>