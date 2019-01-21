<template>
  <div class="redBg"  >Slide 1</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class slide1 extends Vue {

  created() {
    var _this = this;
    console.log(this.$route,this.$router.options.routes[2].children)
        $(document).keydown(function(e) {
            let key = e.keyCode;
            if (key == 40) {
               _this.$router.push('./slide2')
            }
        });
  }
  
}
</script>

<style scoped>

</style>