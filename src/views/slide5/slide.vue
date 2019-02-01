<template>
    <div id="logidelta2">
      <div class="logidelta2_main">
        <div class="logidelta2_left">
          <div class="left_title font_blue">实时监控</div>
          <div class="echart_content">
            <p class="echart_title">设备在线概览</p>
            <div class="deviceChart">
                <deviceChart></deviceChart>
            </div>
          </div>
          <div class="echart_content">
            <p class="echart_title">节点异常监控</p>
            <div class="nodeChart">
                <nodeChart></nodeChart>
            </div>
          </div>
          <div class="echart_content">
            <p class="echart_title">数据量统计</p>
            <div class="NumChart">
                <NumChart></NumChart>
            </div>
          </div>
        </div>
        <div class="logidelta2_middle">
          <div class="num_content font_blue">
            <div class="service_num div_left">
              <span class="fontSize_a">服务企业数</span>
              <p>
                <span class="fontSize_b">1003</span>
                <span class="fontSize_c">家</span>
              </p>
            </div>
            <div class="node_num div_left">
              <span class="fontSize_a">接入节点数</span>
              <p>
                <span class="fontSize_b">5053</span>
                <span class="fontSize_c">个</span>
              </p>
            </div>
            <div class="device_num div_left">
              <span class="fontSize_a">连接设备数</span>
              <p>
                <span class="fontSize_b">25349</span>
                <span class="fontSize_c">台</span>
              </p>
            </div>
          </div>
          <div class="map_content">
            <iotMap></iotMap>
          </div>
        </div>
        <div class="logidelta2_right">
          <div class="right_title font_blue">企业概览</div>
          <div class="echart_content">
            <p class="echart_title">公司类别</p>
            <div class="componyChart">
              <companyChart></companyChart>
            </div>
          </div>
          <div class="echart_content">
            <p class="echart_title">实时计算资源占比</p>
            <div class="recourceChart">
              <recourceChart></recourceChart>
            </div>
          </div>
          <div class="echart_content">
            <p class="echart_title">接入时长占比</p>
            <div class="timeChart">
              <timeChart></timeChart>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from 'echarts';
import deviceChart from "./components/deviceChart.vue";
import nodeChart from "./components/nodeChart.vue";
import iotMap from "./components/iotMap.vue";
import companyChart from "./components/companyChart.vue";
import recourceChart from "./components/recourceChart.vue";
import timeChart from "./components/timeChart.vue";
import NumChart from "./components/NumChart.vue";
@Component({
  components:{
    'deviceChart':deviceChart,
    'nodeChart':nodeChart,
    'iotMap':iotMap,
    'companyChart':companyChart,
    'recourceChart':recourceChart,
    'timeChart':timeChart,
    'NumChart':NumChart
  }
})
export default class slide5 extends Vue {
    created() {
      
    }
    mounted () {  
      
    }

}
</script>

<style scoped>
#logidelta2{
  width: 100%;
  height: 100%;
  background: url("../../assets/img/logidelta2@2x.png") no-repeat;
  background-size: cover;
}
.logidelta2_main{
  width: 100%;
  height: 100%;
  padding-top: 6.1%;
}
.logidelta2_left{
  width: 23.4%;
  height: 100%;
  float: left;
  padding-left: 1%;
  text-align: center;
}
.logidelta2_middle{
  width: 51.2%;
  height: 100%;
  float: left;
  text-align: center;
  padding-top: 2.5%;
}
.logidelta2_right{
  width: 23.4%;
  height: 100%;
  float: left;
  padding-right: 1%;
  text-align: center;
}
.left_title, .right_title{
  font-size: 24px;
  margin: 20px;
}
.num_content{
  width: 100%;
  float: left;
}
.map_content{
  width: 100%;
  height: 100%;
  float: left;
}
.div_left{
  float: left;
  width: 33%;
  padding-left: 0.3%;
}
.font_blue{
  color: #2AEFF1
}
.fontSize_a{
  font-size: 16px;
  line-height: 22px;
}
.fontSize_b{
  font-size: 50px;
  line-height: 50px;
}
.fontSize_c{
  font-size: 20px;
  line-height: 28px;
  padding-left: 15px;
}
.echart_title{
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  background: url("../../assets/img/logidelta-tltle@3x.png") no-repeat;
  background-size: 100%;
  padding-top: 10px;
  margin: 0px;
}
.echart_content{
  /* height: 28%; */
  height: 27vh;
}
.deviceChart,
.nodeChart,
.NumChart,
.mapChart,
.componyChart,
.recourceChart,
.timeChart{
  width: 100%;
  height: 100%;
}

</style>