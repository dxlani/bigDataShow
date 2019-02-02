<template>
  <swiper >
    <swiper-slide>
        <slide1></slide1>
    </swiper-slide>
    <swiper-slide>
        <slide2></slide2>
    </swiper-slide>
    <swiper-slide>
        <slide3></slide3>
    </swiper-slide>
    <swiper-slide>
        <slide4></slide4>
    </swiper-slide>
    <swiper-slide>
        <slide5></slide5>
    </swiper-slide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { default as slide1 } from "../slide1/slide.vue";
import { default as slide2 } from "../slide2/slide.vue";
import { default as slide3 } from "../slide3/slide.vue";
import { default as slide4 } from "../slide4/slide.vue";
import { default as slide5 } from "../slide5/slide.vue";
Vue.use(VueAwesomeSwiper, { 
      slidesPerView: 1,  //显示一页tab
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true         //底部滚动条显示
      },
      autoplay: {
          delay: 30000,        //自动轮播
          disableOnInteraction: false  //操作中断轮播   
      },
      keyboard: {
        enabled: true   //键盘切换
      },
      mousewheel: true, //鼠标滑动切换
      loop: false, //无缝切换
      navigation: {   //键盘配置
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
 })
@Component({
  components:{
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  }
})
export default class home extends Vue {
  created() {
    
  }
}
</script>

<style scoped>

</style>