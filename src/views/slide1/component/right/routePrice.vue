<template>
  <div id="hot-route-price-container">
    <div class="product-title">产品定价统计</div>
    <div class="hot-route-title">
      <div class="route-title">
        <span class="route-box rbx00"></span>
        <span class="route-name">{{hotRouteList[0]}}</span>
      </div>
      <div class="route-title">
        <span class="route-box rbx01"></span>
        <span class="route-name">{{hotRouteList[1]}}</span>
      </div>
      <div class="route-title">
        <span class="route-box rbx02"></span>
        <span class="route-name">{{hotRouteList[2]}}</span>
      </div>
      <div class="route-title">
        <span class="route-box rbx03"></span>
        <span class="route-name">{{hotRouteList[3]}}</span>
      </div>
      <div class="route-title">
        <span class="route-box rbx04"></span>
        <span class="route-name">{{hotRouteList[4]}}</span>
      </div>
      <div class="route-title">
        <span class="route-box rbx05"></span>
        <span class="route-name">{{hotRouteList[5]}}</span>
      </div>
    </div>
    <div id="hot-route-chart"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { Vue, Component } from "vue-property-decorator";

import {
  getFreightRateChart,
  getLastDayOfPreMonth1
} from "../../../../api/nuode/api_nuode";

@Component({})
export default class RoutePrice extends Vue {
  myRouteChart = null;
  route_box_color = [
    "#fd6365",
    "#fd9347",
    "#fcc206",
    "#2dba9a",
    "#3b92d7",
    "#5569a8"
  ];
  hotRouteList = [];
  option = {
    color: ["#fd6365", "#fd9347", "#fcc206", "#2dba9a", "#3b92d7", "#5569a8"],
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis"
    },
    // legend: {
    //     data:['江苏镇江--广东广州','江苏镇江--广东深圳','江苏镇江--广东珠海','江苏镇江--广东东莞','江苏镇江--广东佛山','江苏镇江--广东茂名'],
    //     textStyle:{
    //         color:'#fff'
    //     }
    // },
    grid: {
      left: "7%",
      right: "1%",
      bottom: "1%",
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
      offset: 0,
      // min:0,
      // max:1500,
      type: "value",
      show: true,
      axisTick: { show: false },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#616063"
        }
      },
      nameTextStyle: {
        color: "#fff"
        // fontSize:16
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#616063"]
        }
      }
    },
    series: [
      {
        name: "江苏镇江--广东广州",
        type: "line",
        smooth: true,
        stack: "总量1",
        symbol: "none",
        data: [120, 130, 100, 130, 900, 230, 210],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#fd6365" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "江苏镇江--广东深圳",
        type: "line",
        stack: "总量2",
        symbol: "none",
        smooth: true,
        data: [220, 180, 190, 230, 290, 330, 310],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#fd9347" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "江苏镇江--广东珠海",
        type: "line",
        stack: "总量3",
        symbol: "none",
        smooth: true,
        data: [150, 230, 200, 150, 190, 330, 410],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#fcc206" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "江苏镇江--广东东莞",
        type: "line",
        stack: "总量4",
        symbol: "none",
        smooth: true,
        data: [320, 330, 300, 330, 390, 330, 320],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2dba9a" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "江苏镇江--广东佛山",
        type: "line",
        stack: "总量5",
        symbol: "none",
        smooth: true,
        data: [820, 930, 900, 930, 850, 650, 400],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#3b92d7" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      },
      {
        name: "江苏镇江--广东茂名",
        type: "line",
        stack: "总量6",
        symbol: "none",
        smooth: true,
        data: [450, 100, 700, 650, 130, 100, 650],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#5569a8" },
              { offset: 1, color: "transparent" }
            ])
          }
        }
      }
    ]
  };

  created() {
    this.route_box_color.forEach((item, index) => {
      $(`.rbx0${index}`).css({ backgroundColor: item });
    });
    this.loadData();
  }
  mounted() {
    window.addEventListener("resize",()=>{
     this.myRouteChart.resize()
      
    });

    let obeserver = new MutationObserver((mutations, obeserver) => {
      mutations.forEach(mutation => {
      
      });
    });

    const ele = document.querySelector("#hot-route-price-container");

    const options = {
      childList: true,
      attributes: true,
      subtree: true
    };

    obeserver.observe(ele, options);
  }

  init() {
    var dom = document.getElementById("hot-route-chart");

    if (!this.myRouteChart) {
      this.myRouteChart = echarts.init(dom);
    }
    this.myRouteChart.clear();
    if (this.option && typeof this.option === "object") {
      this.myRouteChart.setOption(this.option, true);
    }
  }

  async loadData() {
    var now = new Date();
    var endDate = getLastDayOfPreMonth1();

    var thisMonth = now.getMonth() + 1;
    var thisYear = now.getFullYear();
    var startMonth = thisMonth > 6 ? thisMonth - 6 : thisMonth + 6;
    var startYear = thisMonth > 6 ? thisYear : thisYear - 1;
    var startDate = startYear + "-" + startMonth + "-" + "01";

    const res = await getFreightRateChart();

    this.option.xAxis.data = [];

    var list = res.data;

    this.hotRouteList = [];
    this.option.series.forEach(item => {
      item.data = [];
    });

    list.forEach(item => {
      item.value.reverse();
    });
    list[0].value.forEach((item, index) => {
      this.option.xAxis.data.push({
        value: item.time,
        textStyle: { align: "right" }
      });
    });
    list.forEach((item, index) => {
      this.hotRouteList[index] = item.key;

      this.option.series[index].name = item.key;
      item.value.forEach((it, ind) => {
        this.option.series[index].data.push(it.feeAmount.toFixed(1));
      });
    });
    this.hotRouteList = this.hotRouteList.map(item => {
      return item.replace(/((北京|上海|重庆|天津)辖县)|(自治州)/g, "");
    });

    this.init();
  }
}
</script>

<style scoped>
#hot-route-price-container {
  background: url("../../../../assets/img/storm/hotrouteprice@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  width: 100%;
  position: relative;
}
.route-title {
  float: left;
  width: 33%;
  font-size: 10px;
  margin-bottom: 1%;
}
.route-box {
  display: inline-block;
  width: 8px;
  height: 8px;
}

#hot-route-chart {
  position: relative;
  left: 1%;
  width: 90%;
  height: 75%;
  top: 12%;
}

.hot-route-title {
  overflow: hidden;
  padding-top: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  top: 15%;
  left: 6%;
}

.hot-route-price-text {
  position: absolute;
  top: 0.4%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1%;
  font-weight: bold;
  color: #fff;
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

.route-name {
  color: #d5d6dc;
}
.product-title {
  color: #efeff2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  position: relative;
  top: 3%;
}
</style>