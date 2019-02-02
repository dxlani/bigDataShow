<template>
  <div class="hot-route-trade-time-container">
    <div class="storm-hot-route-trade-times">热门线路交易次数</div>
    <div class="hot-route-title5">
      <div v-for="(item, index) in hotRouteList" :key="index" class="route-title5">
        <span
          class="route5-box"
          :class="{
                    'rbx00':index===0,
                    'rbx01':index===1,
                    'rbx02':index===2,
                    'rbx03':index===3,
                    'rbx04':index===4,
                    'rbx05':index===5
                }"
        ></span>
        <span class="route-name">{{item.key}}</span>
      </div>
    </div>
    <div id="hrtt-chart"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";

import { Vue, Component } from "vue-property-decorator";

import { GetHotLinesChartsAsync } from "../../../../api/nuode/api_nuode";

interface hotRoute {
  key: number;
}
@Component({})
export default class StormTradeTimes extends Vue {
  public hotRouteList: hotRoute[] = [];
  myChart = null;
  option = {
    color: ["#ff6366", "#fe9345", "#fec208", "#2dba9a", "#3992d6", "#5569a8"],
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: [],
      textStyle: {
        color: "#fff"
      }
    },
    grid: {
      left: "2%",
      right: "5%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLine: {
        lineStyle: {
          color: "#616063"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#616063"
        }
      }
    },
    yAxis: {
      type: "value",
      show: true,
      splitNumber: 5,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#616063"
        }
      },
      axisTick: { show: false },
      splitLine: {
        show: true,
        interval: 1,
        lineStyle: {
          color: ["#616063"]
        }
      }
    },
    series: [
      {
        name: "邮件营销",
        type: "line",
        symbol:'none',
        smooth: true,
        stack: "总量1",
        data: [],
         itemStyle:{
          normal:{
            color:"#ff6366"
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#ff6366" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "联盟广告",
        type: "line",
         symbol:'none',
        smooth: true,
        stack: "总量2",
        itemStyle:{
          normal:{
            color:"#fe9345"
          }
        },
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#fe9345" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "视频广告",
        type: "line",
         symbol:'none',
        smooth: true,
        stack: "总量3",
        itemStyle:{
          normal:{
            color:"#fec208"
          }
        },
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#fec208" },
              // {offset: 0.5, color: 'pink'},
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "直接访问",
        type: "line",
         symbol:'none',
        smooth: true,
        stack: "总量4",
        itemStyle:{
          normal:{
            color:"#2dba9a"
          }
        },
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2dba9a" },
              // {offset: 0.5, color: 'pink'},
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "搜索引擎",
        type: "line",
         symbol:'none',
        smooth: true,
        stack: "总量5",
        itemStyle:{
          normal:{
            color:"#3992d6"
          }
        },
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#3992d6" },
              // {offset: 0.5, color: 'pink'},
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "搜索引擎",
        type: "line",
         symbol:'none',
        smooth: true,
        stack: "总量5",
        itemStyle:{
          normal:{
            color:"#5569a8"
          }
        },
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#5569a8" },
              // {offset: 0.5, color: 'pink'},
              { offset: 1, color: "transparent" }
            ])
          }
        }
      }
    ]
  };

  mounted() {
   
   
  this.loadData();
    
     window.addEventListener("resize",()=>{
        this.loadData();
     this.myChart.resize()
      
    });
  

  }

  init() {
    var dom = document.getElementById("hrtt-chart");

    if (!this.myChart) {
      this.myChart = echarts.init(dom);
    }

    this.myChart.clear();

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option, true);
    }
  }

  /**
   * 加载上个月前五线路交易次数统计
   */
  async loadData() {
    var thisYear = new Date().getFullYear();
    var thisMonth = new Date().getMonth();
    let preMonth = thisMonth == 0 ? 12 : thisMonth;
    let preYear = thisMonth ? thisYear : thisYear - 1;
    let startTime = preYear + "-" + preMonth + "-" + "01";
    let endTime = thisYear + "-" + (Number(thisMonth) + 1) + "-" + "01";
    const res = await GetHotLinesChartsAsync();
    var list = res.data;  
    this.hotRouteList = [];
    this.option.xAxis.data = [];
    list.forEach((ele, index) => {
      this.hotRouteList.push(ele);
      this.option.series[index].name = ele.key;
      this.option.series[index].data = [];
      ele.value.pop();
      ele.value.forEach((item, idx) => {
        let time = item.date.split("-").join("/");
        this.option.series[index].data.push(item.counts);
        if (index === 0) {
          this.option.xAxis.data.push(time);
        }
      });
    });

    this.init();
  }
}
</script>

<style scoped>
.hot-route-trade-time-container {
  background: url("../../../../assets/img/storm/hotroutetrade@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  width: 100%;
  height: 25%;
  position: relative;
  margin-top: 4%;
}

.hot-route-title5 {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  position: relative;
  top: 15%;
  margin: 0 20px 0 20px;
  color: #d5d6dc;
}

.route-title5 {
  min-width: 26%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: baseline;
  width: 33%;

  margin-bottom: 6.7px;
}

.route5-box {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #f00;
  margin-right: 4px;
  margin-top: 0.03rem;
}

#hrtt-chart {
  position: relative;
  left: 3%;
  width: 90%;
  height: 75%;
  top: 5%;
  bottom: 10%;
 
}

.storm-hot-route-trade-times {
  position: absolute;
  top: 3%;
  color: #00c1f1;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  left: 0;
}

.rbx00 {
  background-color: #ff6366 !important;
}

.rbx01 {
  background-color: #fe9345 !important;
}
.rbx02 {
  background-color: #fec208 !important;
}
.rbx03 {
  background-color: #2dba9a !important;
}
.rbx04 {
  background-color: #3992d6 !important;
}
.rbx05 {
  background-color: #5569a8 !important;
}
</style>