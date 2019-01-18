<template>
  <div class="yellowBg" >Slide 2
  <countTo :startVal='startVal' :endVal='endVal' :duration='1000'></countTo>
  <!-- <countTo :startVal='endVal' :endVal='startVal' :duration='1000'></countTo> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  
})
export default class slide2 extends Vue {
  public startVal:number=null
  public endVal:number=null
  created() {
     this.startVal=0;
     this.endVal=2019
     var _this = this;
        $(document).keydown(function(e) {
            let key = e.keyCode;
            if (key == 38) {
               _this.$router.push('./slide1')
            }
            if (key == 40) {
               _this.$router.push('./slide3')
            }
        });
  }
  
}
</script>

<style scoped>

</style>