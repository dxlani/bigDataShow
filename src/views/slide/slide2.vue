<template>
  <div>Slide 2
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
  }
}
</script>

<style scoped>

</style>