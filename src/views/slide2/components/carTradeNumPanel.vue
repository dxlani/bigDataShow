<template>
  <div>
    <div class="car-trade-nums">
      <div class="car-trade-nums-text">单一车辆交易次数占比图</div>
      <div class="car-type-container">
        <div class="about-statics" id="s3">
          <div id="cartradenums"></div>
        </div>
        <div class="about-car">
          <div class="left-label-item">
            <div class="left-label-icon left-label-icon1"></div>0-10
          </div>
          <div class="left-label-item">
            <div class="left-label-icon left-label-icon2"></div>10-20
          </div>
          <div class="left-label-item">
            <div class="left-label-icon left-label-icon3"></div>20-30
          </div>
          <div class="left-label-item">
            <div class="left-label-icon left-label-icon4"></div>30-40
          </div>
          <div class="left-label-item">
            <div class="left-label-icon left-label-icon5"></div>40+
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
import api_ccp from "../../../api/api_ccp";
@Component({})
export default class carTradeNumPanel extends Vue {
  public OneCarTransactionNumList: any = [];
  public myChart: any;
  option = {
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    series: [
      {
        name: "单一车辆交易次数占比图",
        type: "pie",
        radius: ["60%", "80%"],
        center: ["55%", "50%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
           formatter:"{d}%\n\n{b}",
            color: "#fff"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "14"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        color: ["#FF326D", "#E26FD6", "#fd9347", "#44C5FD", "#6650FC"],
        data: []
      }
    ]
  };
  created() {
    api_ccp.GetOneCarTransactionNum().then(res => {
      this.OneCarTransactionNumList = res;
      this.initchart();
    });
  }

  initchart() {
    this.OneCarTransactionNumList.forEach((ele, index) => {
      this.option.series[0].data.push({ value: ele.carNum, name: ele.num });
    });

    var cartradenums = document.getElementById("cartradenums");
    cartradenums.style.height =
      document.getElementById("s3").offsetHeight + "px";
    this.myChart = echarts.init(cartradenums);
    this.myChart.setOption(this.option);
    var currentIndex = -1;
    setInterval(() => {
      var dataLen = this.option.series[0].data.length;
      // 取消之前高亮的图形
      this.myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      currentIndex = (currentIndex + 1) % dataLen;
      // 高亮当前图形
      this.myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      // 显示 tooltip
      this.myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }, 1000);
    window.onresize = this.myChart.resize;
  }
}
</script>


<style lang="scss" scoped>
.about-car {
  width: 95%;
  padding-bottom: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  font-size: 0.2rem;
}

.about-car > div {
  margin-bottom: 4%;
}
.about-car-item {
  width: 85%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #007eb0;
  height: 14%;
  padding-right: 2%;
}

.label-num {
  width: 9%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6a00;
}

.about-statics {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
}

.left-label-banner {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 40%;
  margin-bottom: 20%;
  margin-left: 5%;
}

.left-label-icon {
  width: 6px;
  height: 6px;
  margin-right: 4px;
}

.left-label-item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 0.1vw;
}

.left-label-item1,
.left-label-item2,
.left-label-item3 {
  width: 35%;
}

.left-label-icon1 {
  background-color: #ff326d;
}
.left-label-icon2 {
  background-color: #e26fd6;
}
.left-label-icon3 {
  background-color: #ffa883;
}
.left-label-icon4 {
  background-color: #44c5fd;
}
.left-label-icon5 {
  background-color: #6650fc;
}

.about-money > div {
  margin-bottom: 4%;
}

.wd-car-pull-right,
.wd-money-pull-right {
  display: inline-block;
  /*width: 50%;*/
  text-align: right;
}
.wd-car-pull-right {
  margin-right: 5%;
  width: 50%;
}
.wd-money-pull-right {
  margin-right: 5%;
  width: 45%;
}
.wd-pull-left {
  text-align: left;
}

.car-trade-nums {
  background: url("../../../assets/img/cartradenums@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  padding-top: 0rem;
  height: 29vh;
  padding-top: 1.5%;
  position: relative;
  margin-top: 2vh;
  color: #fff;
}
.car-type-container {
  width: 100%;
  margin-top: 5%;
  /*overflow: hidden;*/
  height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /*padding-bottom: 10*/
}
.carIcon {
  width: 20px;
  height: 16px;
}

.car-trade-nums-text {
  position: absolute;
  top: 0.38vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  font-weight: bold;
  color: #fff;
}

#cartradenums {
  width: 100%;
}

.num {
  font-size: 0.6vw;
  color: #fff;
  font-weight: bold;
}
</style>


