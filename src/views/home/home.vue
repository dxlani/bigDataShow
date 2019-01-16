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
    <div class="swiper-scrollbar" slot="scrollbar"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { default as slide1 } from "../slide/slide1.vue";
import { default as slide2 } from "../slide/slide2.vue";
import { default as slide3 } from "../slide/slide3.vue";
Vue.use(VueAwesomeSwiper, { 
      slidesPerView: 1,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true
      },
      keyboard: {
        enabled: true
      },
      mousewheel: true,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
 })
@Component({
  components:{
    slide1,
    slide2,
    slide3,
  }
})
export default class home extends Vue {
  created() {
    
  }
}
</script>

<style scoped>

</style>