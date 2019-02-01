<template>
  <div class="main">
    <div class="left">
      <withdraw></withdraw>
      <order-table></order-table>
      <trade-times></trade-times>
    </div>
    <div class="middle">
      <main-charts></main-charts>
    </div>

    <div class="right">
      <trade-statistics ref="tradeStatics" class="right-child1"></trade-statistics>
      <client-order ref="clientOrder" class="right-child2"></client-order>
      <route-price ref="routePrice" class="right-child3"></route-price>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import withdraw from "./component/left/withdraw.vue";
import tradeTimes from "./component/left/tradeTimes.vue";
import orderTable from "./component/left/orderTable.vue";
import mainCharts from "./component/middle/mainCharts.vue";
import tradeStatistics from "./component/right/tradeStatistics.vue";
import routePrice from "./component/right/routePrice.vue";
import clientOrder from "./component/right/clientOrder.vue";

import {
  GetVehicleCount,
  GetWithdrawalsMoney,
  GetRealTimeOrder,
  GetHotLinesChartsAsync
} from "../../api/nuode/api_nuode";

@Component({
  components: {
    withdraw,
    tradeTimes,
    orderTable,
    mainCharts,
    tradeStatistics,
    routePrice,
    clientOrder
  }
})
export default class slide1 extends Vue {
  public $refs;

  mounted() {

  
   
    
  }
}
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  background-image: url("../../assets/img/storm/stormbg@3x.png");
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  display: flex;
}
.left {
  width: 25%;
  height: inherit;
  padding-left: 1%;
  font-size: 10px;
  font-weight: 100;
  /* -webkit-transform-origin-x: 0;  
  -webkit-transform: scale(.99);  
   transform: scale(.99); */
}
.middle {
  width: 50%;
  height: inherit;
  
}
.right {
  width: 25%;
  height: inherit;
 
  padding-right: 1%;
}

.right-child1{
  height: 17%;
  margin-top: 7%;
}

.right-child2{
  height: 44%;
  margin-top: 4%;
}

.right-child3{
 height: 25%;
  margin-top: 4%;
}

</style>