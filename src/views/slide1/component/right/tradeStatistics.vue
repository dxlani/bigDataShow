<template>
  <div class="trade-statistics-container">
    <div class="trade-statistics-text">客户交易统计</div>
    <div class="trade-statistics-title-box">
      <div class="trade-statistics-title">
        <span class="colorblock cb01"></span>
        <span class="trt-title01">交易次数</span>
      </div>
      <div class="trade-statistics-title">
        <span class="colorblock cb00"></span>
        <span class="trt-title01">交易额</span>
      </div>
    </div>
    <div id="trade-statistics-chart"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import "echarts/map/js/china.js";

import { Vue, Component } from "vue-property-decorator";

import {
  getTransactionChart,
  numConverse,
  getLastDayOfPreMonth1
} from "../../../../api/nuode/api_nuode";

@Component({})
export default class TradeStatics extends Vue {
  trade_static_color = ["#fe0000", "#0f0"];
  myChart = null;
  option = {
    color: ["#3a86fd", "#ff727b"],
    title: {
      text: ""
    },
    // legend: {
    //     data: ['交易次数', '交易额']
    // },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      right: "1%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      axisTick: { show: false },
      data: ["2012", "2013", "2014", "2015", "2016"],
      axisLabel: {
        color: "#fff"
      }
    },
    yAxis: {
      type: "value",
      show: false,
      axisTick: { show: false },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#fff"
        }
      },
      nameTextStyle: {
        color: "#fff",
        fontSize: 16
      }
    },
    series: [
      {
        name: "交易次数",
        type: "bar",
        barWidth: "10%",
        barGap: 0,
        itemStyle: {
          normal: {
            barBorderRadius: [0, 0, 0, 0]
          }
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: "交易额",
        type: "bar",
        barWidth: "10%",
        itemStyle: {
          normal: {
            barBorderRadius: [0, 0, 0, 0]
          }
        },
        data: [220, 182, 191, 234, 290]
      }
    ]
  };

  created() {
    this.trade_static_color.forEach((item, index) => {
      $(`.cb0${index}`).css({ backgroundColor: item });
    });

    this.loadData();
   
  }

  mounted() {
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  }

  init() {
    var dom = document.getElementById("trade-statistics-chart");
    if (!this.myChart) {
      this.myChart = echarts.init(dom);
    }
    this.myChart.clear();
    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option, true);
    }
  }

  async loadData() {
    var now = new Date();

    var endDate = getLastDayOfPreMonth1();

    var thisMonth = now.getMonth() + 1;
    var thisYear = now.getFullYear();
    var startMonth = thisMonth > 4 ? thisMonth - 4 : thisMonth + 8;
    var startYear = thisMonth > 4 ? thisYear : thisYear - 1;
    var startDate = startYear + "-" + startMonth + "-01";

    const res = await getTransactionChart();

    var list = res.data;

    this.option.xAxis.data = [];
    this.option.series[0].data = [];
    this.option.series[1].data = [];

    list.forEach((item, index) => {
      let time =
        item.time.split("-")[0] + "年" + item.time.split("-")[1] + "月";
      this.option.xAxis.data.push(time);
      this.option.series[0].data.push(item.num);
      this.option.series[1].data.push(
        numConverse(item.sumReceivableTotalPrice, 10000)
      );
    });

    this.init();
  }
}
</script>

<style scoped>
.trade-statistics-container {
  background: url("../../../../assets/img/storm/trade-statistics-bg@3x.png")
    no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  padding-top: 1%;
  position: relative;
  color: #d5d6dc;
}

#trade-statistics-chart {
  width: 100%;
  height: 100%;
  position: relative;
  right: 10%;
  bottom: 11%;
}

.trade-statistics-title-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-left: 10%;
  top: 25%;
}

.colorblock {
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-right: 0.1rem;
  margin-left: 0.5rem;
}

.cb01 {
  background-color: #3a86fd !important;
}
.cb00 {
  background-color: #ff727b !important;
}
.trade-statistics-text {
  position: absolute;
  top: 1.5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  color: #00c1f1;
  font-weight: bold;
  color: #fff;
}
</style>