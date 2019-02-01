<template>
  <div class="client-order-container">
    <div class="client-order-text">客户订单统计</div>
    <div class="client-order-title">
      <div class="client-order-name">单位名称</div>
      <div class="client-order-count">订单量</div>
    </div>
    <div id="client-order-chart"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import { Vue, Component } from "vue-property-decorator";

import {
  Main_getCustomerOrdersCount,
  transformDate
} from "../../../../api/nuode/api_nuode";
@Component({})
export default class ClientOrder extends Vue {
  myChart = null;
  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },

    grid: {
      left: "2%",
      right: "10%",
      bottom: "2%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      axisTick: { show: false },
      boundaryGap: [0, 0.01],
      axisLabel: {
        // formatter:function(params){
        //     console.log(params);
        //     return params/1000+"k"
        // }
        rotate: 60
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#616063"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#616063"]
        }
      },
      nameTextStyle: {
        color: "#fff"
      }
    },
    yAxis: {
      type: "category",
      data: [],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff"
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#0075a1"
        }
      }
    },
    series: [
      {
        name: "（订单量）",
        type: "bar",
        data: [],
        barWidth: 10,
        label: {
          normal: {
            show: true,
            position: ["105%", "20%"],
            textStyle: {
              color: "#fff"
            }
          }
        },
        itemStyle: {
          normal: {
            barBorderRadius: [0, 0, 0, 0],
            color: function(params) {
              var colorList = [
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9",
                "#055be9"
              ];
              return colorList[params.dataIndex];
            }
          }
        }
      }
    ]
  };

  created() {
    this.loadData();
   

    

  }

  mounted() {
  

     window.addEventListener("resize",()=>{
     this.myChart.resize()
      
    });
  }

  init() {
    var dom = document.getElementById("client-order-chart");
    if (!this.myChart) {
      this.myChart = echarts.init(dom);
    }
    this.myChart.clear();
    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option, true);
    }
  }

  async loadData() {
    let now = new Date();
    let startTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + "01";
    let endTime = transformDate(now);

    const res = await Main_getCustomerOrdersCount();

    let list = res.data;

    this.option.series[0].data = [];
    this.option.yAxis.data = [];
    list = list.reverse();
    list.forEach(element => {
      this.option.series[0].data.push(element.counts);
      let temp = element.clientName;
      if (temp.length >= 8) {
        temp = temp.substr(0, 8) + "...";
      }
      this.option.yAxis.data.push(temp);
    });

    this.init();
  }
}
</script>

<style scoped>
.client-order-container {
  background: url("../../../../assets/img/storm/clientorder@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  padding-top: 8%;
  width: 100%;
  position: relative;
}

.client-order-name {
  display: inline-block;
  font-weight: bold;
}

.client-order-count {
  display: inline-block;
  margin-left: 10%;
  font-weight: bold;
}

#client-order-chart {
  width: 100%;
  height: 100%;
  position: relative;
  left: 2%;
}

.client-order-title {
  position: absolute;
  width: 50%;
  left: 13%;
  top: 10%;
  color: #d5d6dc;
  display: flex;
}

.client-order-text {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  top: 1.5%;
  width: 100%;
}
</style>