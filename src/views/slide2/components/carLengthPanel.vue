<template>
  <div>
    <div class="car-length">
      <div class="car-length-text">车长分布TOP3</div>
      <div class="car-type-container">
        <div class="about-statics" id="s2">
          <div id="carlength"></div>
        </div>
        <div class="about-car">
          <div class="about-car-item-box">
            <div class="about-car-item" v-for="item in carleLengData" :key="item.index">
              <span class="label-num">{{item.index}}</span>
              <span class="item-name">{{item.name}}</span>
              <span class="item-value">{{item.value}}</span>
            </div>
          </div>

          <div class="left-label-banner">
            <div class="left-label-item left-label-item1">
              <div class="left-label-icon left-label-icon1"></div>4.2米
            </div>
            <div class="left-label-item">
              <div class="left-label-icon left-label-icon2"></div>6.8米
            </div>
            <div class="left-label-item left-label-item2">
              <div class="left-label-icon left-label-icon3"></div>9.6米
            </div>
            <div class="left-label-item">
              <div class="left-label-icon left-label-icon4"></div>13米
            </div>
            <div class="left-label-item left-label-item3">
              <div class="left-label-icon left-label-icon5"></div>17.5米
            </div>
            <div class="left-label-item">
              <div class="left-label-icon left-label-icon6"></div>其他
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import api_ccp from "../../../api/api_ccp";
import * as echarts from "echarts";

@Component({})
export default class carLengthPanel extends Vue {
  public myChart: any;
  public carleLengthList: any = [];
  public carleLengData: any = [];

  option = {
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    series: [
      {
        name: "车长分布",
        type: "pie",
        radius: ["30%", "45%"],
        center: ["55%", "50%"],
        data: [],
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
        color: [
          "#E26FD6",
          "#FF4D9B",
          "#DFC72F",
          "#3CDAFF",
          "#0ED49F",
          "#055BE9"
        ]
      }
    ]
  };
  created() {
    api_ccp.ccp().then(res => {
      this.carleLengthList = res.vehicleLengthList;
      this.initchart();
    });
  }

  initchart() {
    this.carleLengthList.forEach((ele, index) => {
      this.option.series[0].data.push({
        value: ele.counts,
        name: ele.carLength
      });
      if (index <= 2) {
        this.carleLengData.push({
          index: index + 1,
          name: ele.carLength,
          value: ele.counts
        });
      }
    });

    var carlength = document.getElementById("carlength");
    carlength.style.height =
      document.getElementById("s2").offsetHeight + "px";
    this.myChart = echarts.init(carlength);
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  margin-bottom: 10px;
  margin-right: 25px;
}

.about-car > div {
  margin-bottom: 3%;
}
.about-car-item {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.label-num {
  width: 20px;
  height: 20px;
  background-color: #00cfff;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8vw;
}

.about-statics {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  /* background-color: red */
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
  width: 40%;
  font-size: 0.8vw !important;
}

.left-label-item1,
.left-label-item2,
.left-label-item3 {
  width: 45%;
}

.left-label-item {
  font-size: 0.16rem;
}

.left-label-icon1 {
  background-color: #055be9;
}
.left-label-icon2 {
  background-color: #0ed49f;
}
.left-label-icon3 {
  background-color: #3cdaff;
}
.left-label-icon4 {
  background-color: #e26fd6;
}
.left-label-icon5 {
  background-color: #dfc72f;
}
.left-label-icon6 {
  background-color: #ff4d9b;
}

#carlength {
  margin-right: 10px;
  width: 90%;
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

.car-length {
  background: url("../../../assets/img/carlengthtop3@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  padding-top: 0rem;
  height: 29vh;
  padding-top: 1.5%;
  position: relative;
  margin-top: 2vh;
  width: inherit;
  color: #fff;
}
.car-type-container {
  width: 100%;
  margin-top: 5%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.2rem;
}
.with-draw-num {
  font-family: Arial;
  font-size: 150%;
  color: #00cfff;
  /*margin-left: 0.05rem;*/
}

.driver-withdraw-car-img {
  background: url("../../../assets/img/che.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  width: 0.32rem;
  height: 0.32rem;
  margin: 0 auto;
  margin-bottom: 8%;
}
.driver-withdraw-money-img {
  background: url("../../../assets/img/qian.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  width: 0.32rem;
  height: 0.32rem;
  margin: 0 40%;
  margin-bottom: 6.545%;
}

.car-length-text {
  position: absolute;
  top: 0.4vh;
  width: 100%;
  color: #fff;
  font-size: 1vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-name,
.item-value {
  font-size: 0.9vw;
}

.about-car-item-box,
.left-label-banner {
  width: 100%;
  padding: 0px 8px;
  flex: 1;
  background-color: #191847;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.about-car-item-box {
  margin-bottom: 10px;
}

.left-label-banner {
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
