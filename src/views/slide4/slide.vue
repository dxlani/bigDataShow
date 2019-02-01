<template>
  <div class="platform-main">
    <div class="main-box">
      <div class="pm-l">
        <div class="pm-box">
          <div class="pm-title">
            <span>数据统计</span><span class="small">/月</span>
          </div>
          <div class="px-txt">
            <div class="txt-box yellow">
              <div class="txt-tit">新增企业</div>
              <div class="txt-nr"><span class="big-txt">{{dataCountVal.newenterprise}}</span>家</div>
            </div>
             <div class="txt-box yellow">
              <div class="txt-tit">新增行业类别</div>
              <div class="txt-nr"><span class="big-txt">{{dataCountVal.newtype}}</span>个</div>
            </div>
            <div class="txt-box green">
              <div class="txt-tit">新增节点数</div>
              <div class="txt-nr"><span class="big-txt">{{dataCountVal.newnode}}</span>个</div>
            </div>
             <div class="txt-box green">
              <div class="txt-tit">新增设备数</div>
              <div class="txt-nr"><span class="big-txt">{{dataCountVal.newdevice}}</span>个</div>
            </div>
          </div>
        </div>
        <div class="pm-box">
          <div class="pm-title">
            <span>节点统计</span>
          </div>
          <div class="pm-charts">

              <industrialChart ref="industrialChart"></industrialChart>
              <geographicalDistributionChart ref="geographicalDistributionChart"></geographicalDistributionChart>
          </div>
        </div>
        <div class="pm-box">
          <div class="pm-title">
            <span>设备类型统计</span>
          </div>
          <div class="pm-charts">
            <div id="equipmentTypeCharts"  style="height:100%">
              </div>
          </div>
        </div>
      </div>
      <div class="pm-m">
        <iotMap ></iotMap>
      </div>
      <div class="pm-r">
          <div class="pm-box">
          <div class="pm-title">
            <span>模型统计</span>
          </div>
          <div class="px-txt">
            <div class="txt-box yellow">
              <div class="txt-tit">工业APP总数</div>
              <div class="txt-nr"><span class="big-txt">{{modelCount.industryApp}}</span>个</div>
            </div>
             <div class="txt-box yellow">
              <div class="txt-tit">APP种类</div>
              <div class="txt-nr"><span class="big-txt">{{modelCount.Apptype}}</span>种</div>
            </div>
            <div class="txt-box green">
              <div class="txt-tit">通用算法模型</div>
              <div class="txt-nr"><span class="big-txt">{{modelCount.arithmeticSum}}</span>个</div>
            </div>
             <div class="txt-box green">
              <div class="txt-tit">工业机理模型</div>
              <div class="txt-nr"><span class="big-txt">{{modelCount.IndustrialModel}}</span>个</div>
            </div>
          </div>
        </div>
        <div class="pm-box">
          <div class="pm-title">
            <span>内存使用率</span>
          </div>
          <div class="pm-charts">
              <ram-chart></ram-chart>
          </div>
        </div>
        <div class="pm-box">
          <div class="pm-title">
            <span>任务成功率</span>
          </div>
          <div class="pm-charts">
             <task-chart></task-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from 'echarts';
import "echarts/map/js/china.js";
import iotMap from "./components/iotMap.vue";
import ramChart from "./components/ramChart.vue";
import taskChart from "./components/taskChart.vue";
import industrialChart from "./components/industrialChart.vue";
import geographicalDistributionChart from "./components/geographicalDistributionChart.vue";
const dataCount = require('./components/dataCount.json');
const GetModelCount = require('./components/GetModelCount.json');
const GetIndustrialDistribution = require('./components/GetIndustrialDistribution.json');
const GetGeographicalDistribution = require('./components/GetGeographicalDistribution.json');
const GetDeviceType = require('./components/GetDeviceType.json');

interface provinceVehiclesResponse {
   province: string;
  nodeSum: number,
  deviceSum: number,
  deviceonlinepercent: number
}

@Component({
  components: {
    iotMap,
    ramChart,
    taskChart,
    industrialChart,
    geographicalDistributionChart
  }
})
export default class slide1 extends Vue {
   public provinceData: Array<provinceVehiclesResponse> = [];
  $ref:{
  industrialChart: HTMLFormElement,
  geographicalDistributionChart: HTMLFormElement
}

  myChart2: any;


  /**数据统计 */
  dataCountVal = {}
  /**行业分布 */
  industrialDistribution = []
  /**地域分布 */
  geographicalDistribution = []
  /**设备类型 */
  deviceType = []
  responseTime = []
  ownDevice = []
  externalDevice = []
  /**模型统计 */
  modelCount = {}
  mapRate = []

optionTt = {
            grid: {
                y:30,
                left: '2%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            legend: {
                left:0,
                itemWidth: 8,
                itemHeight: 8,
                padding:[15,50],
                itemGap:20,
                textStyle:{
                    color: '#fff',
                    fontSize: 14,
                },
                data: ['自有设备', '外接设备']
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data:  this.responseTime,
                axisTick:{show:false},
                axisLabel:{
                    textStyle: {
                        color: '#666'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                splitLine:{
                    show:false
                }
            },
            series: [{
                name: '自有设备',
                type: 'bar',
                barGap: 0,
                barWidth: 12,
                itemStyle:{
                    color: '#EB595A',
                },
                data: this.ownDevice,
            },
            {
                name: '外接设备',
                type: 'bar',
                barWidth: 12,
                itemStyle:{
                    color: '#2AEFF1',
                },
                data: this.externalDevice,
            }]
        }

  created() {
    }
  mounted() {
    this.initData();
  }

  initData() {

    /**数据统计 */
    this.dataCountVal = dataCount;
    /**模型统计 */
     this.modelCount = GetModelCount;
    // /**行业分布 */
    this.industrialDistribution = GetIndustrialDistribution;
    this.$refs.industrialChart.initechart(this.industrialDistribution)


    // /**地域分布 */
    this.geographicalDistribution = GetGeographicalDistribution;
    this.$refs.geographicalDistributionChart.initechart(this.geographicalDistribution)

    // /**设备类型 */
    this.deviceType = GetDeviceType;
    this.deviceType.forEach((item) => {
        this.responseTime.push(item.key)
        this.ownDevice.push(item.value.owndevice)
        this.externalDevice.push(item.value.externaldevice)
      });
    var equipmentTypeCharts = document.getElementById("equipmentTypeCharts");
    this.myChart2 = echarts.init(equipmentTypeCharts);
    window.addEventListener("resize",()=> {
            this.myChart2.resize();
        });
    this.myChart2.setOption(this.optionTt);

  }


}
</script>

<style lang="scss" scoped>
.platform-main {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/slide4/bg-pm.png) no-repeat;
  background-size: 100% 100%;
  .main-box{
    display: flex;
    justify-content: space-between;
    padding: 6.8% 1% 0 1%;

    .pm-l,.pm-r{
      width: 23.4%;
      height: 100%;
    }
    .pm-m {
      width: 53.2%;
      height: 100%;
      #map{
        width: 100%;
        min-height: 60rem;
      }
    }
    .pm-box {
      margin-bottom: 20px;
      height: 27vh;
      .pm-title {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 22px;
        background: url(../../assets/img/slide4/bg-title.png) no-repeat top;
        width: 100% ;
        background-size: 100% 100%;
        padding-top: 10px;
        .small{
          font-size: 12px;
          display: inline-block;
          margin-left: 5px;
        }
      }
      .px-txt{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
         padding-left: 60px;
      box-sizing: border-box;
      }
      .txt-box{
        flex: 50%;
        margin-bottom: 4vh;
        .txt-tit{
          margin-bottom: 2vh;
        }
        .txt-nr {
          .big-txt {
            font-family: PingFangSC-Medium;
            font-size: 40px;
            letter-spacing: 4px;
            line-height: 40px;
          }
        }
      }
      .pm-charts {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        width: 100%;
        height: 100%;
        #industrialDistributionChart,#geographicalDistributionChart{
          flex: 50%;
        }
        #equipmentTypeCharts,#ramChart,#taskChart{
          flex: 100%;
        }
      }

      .yellow{
        color: #FEED4F;
      }
      .green {
        color: #00E634;
      }
    }
  }
}
</style>
