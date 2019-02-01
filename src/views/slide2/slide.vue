<template>
  <div class="ccp_main">
    <div class="left">
      <carTradingNumPanel :carTransactionNumTop5List="carTransactionNumTop5List"></carTradingNumPanel>
      <carFeeAmount :GetCarFeeAmountTop5List="GetCarFeeAmountTop5List"></carFeeAmount>
      <codeNumPanel :CodeNumTop5List="CodeNumTop5List"></codeNumPanel>
    </div>
    <div class="middle">
      <ccpmap ref="ccpmap"></ccpmap>
    </div>
    <div class="right">
      <carTypePanel :vehicleTypeList="vehicleTypeList"></carTypePanel>
      <carLengthPanel></carLengthPanel>
      <carTradeNumPanel></carTradeNumPanel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ccpmap from "./components/ccpmap.vue";
import carTradingNumPanel from "./components/carTradingNumPanel.vue";
import carFeeAmount from "./components/carFeeAmount.vue";
import codeNumPanel from "./components/codeNumPanel.vue";
import carTypePanel from "./components/carTypePanel.vue";
import carLengthPanel from "./components/carLengthPanel.vue";
import carTradeNumPanel from "./components/carTradeNumPanel.vue";
import api_ccp from "../../api/api_ccp";
interface provinceVehiclesResponse {
  counts: number;
  id: number;
  province: string;
}
interface carTransactionNumTop5Response {
  id: number;
  carCode: string;
  num: number;
}
 
@Component({
  components: {
    ccpmap,
    carTradingNumPanel,
    carFeeAmount,
    codeNumPanel,
    carTypePanel,
    carLengthPanel,
    carTradeNumPanel
  }
})
export default class slide2 extends Vue {
  public provinceData: Array<provinceVehiclesResponse> = [];
  public carTransactionNumTop5List: Array<carTransactionNumTop5Response> = [];
  public GetCarFeeAmountTop5List:any = [];
  public CodeNumTop5List: any = [];
  public vehicleTypeList: any = [];


  $refs: {
    ccpmap: HTMLFormElement;
  };
  created() {
    api_ccp.ccp().then(res => {
      this.provinceData = res.provinceVehiclesList;
      this.$refs.ccpmap.initchart(this.provinceData);
      this.vehicleTypeList = res.vehicleTypeList;
    });
    this.GetCarTransactionNumTop5();
    this.GetCarFeeAmountTop5();
    this.GetCodeNumTop5();
  }

  GetCarTransactionNumTop5(){
    api_ccp.GetCarTransactionNumTop5().then(res=>{
        this.carTransactionNumTop5List = res;
    })
  }
  GetCarFeeAmountTop5(){
    api_ccp.GetCarFeeAmountTop5().then(res=>{
        this.GetCarFeeAmountTop5List = res;
    })
  }

  GetCodeNumTop5(){
    api_ccp.GetCodeNumTop5().then(res=>{
      this.CodeNumTop5List = res;
    })
  }
}
</script>

<style lang="scss" scoped>
.ccp_main {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/Artboard@3x.png") no-repeat;
  background-size: 100% 100%;
}
.left {
  width: 23%;
  height: 100vh;
  float: left;
  padding-left: 1%;
}
.middle {
  width: 48%;
  height: 100vh;
  float: left;
}
.right {
  width: 27%;
  height: 100vh;
  float: left;
  padding-right: 1%;
}
</style>