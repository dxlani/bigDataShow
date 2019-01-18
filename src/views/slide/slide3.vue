<template>
  <div  class="blueBg">Slide 3</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class slide3 extends Vue {

  created() {
          var _this = this;
        $(document).keydown(function(e) {
            let key = e.keyCode;
            if (key == 38) {
               _this.$router.push('./slide2')
            }
        });
  }
}
</script>

<style scoped>

</style>