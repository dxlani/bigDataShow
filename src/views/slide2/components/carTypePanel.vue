<template>
  <div>
    <div class="car-type">
      <div class="car-type-text">车型分布TOP3</div>
      <div class="car-type-container">
        <div class="about-statics" id="s1">
          <div id="main"></div>
        </div>
        <div class="about-car">
          <div class="about-car-item-box">
            <div class="about-car-item" v-for="item in vehicleTypedata" :key="item.index">
              <span class="label-num">{{item.index}}</span>
              <span class="item-name">{{item.name}}</span>
              <span class="item-value">{{item.value}}</span>
            </div>
          </div>
          <div class="left-label-banner">
            <div class="left-label-item left-label-item1">
              <div class="left-label-icon left-label-icon1"></div>标厢
            </div>
            <div class="left-label-item">
              <div class="left-label-icon left-label-icon2"></div>大平板
            </div>
            <div class="left-label-item left-label-item2">
              <div class="left-label-icon left-label-icon3"></div>半挂
            </div>
            <div class="left-label-item">
              <div class="left-label-icon left-label-icon4"></div>高地板
            </div>
            <div class="left-label-item left-label-item3">
              <div class="left-label-icon left-label-icon5"></div>平板
            </div>
            <div class="left-label-item left-label-item6">
              <div class="left-label-icon left-label-icon6"></div>高栏平板
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
export default class carTypePanel extends Vue {
  public myChart: any;
  public vehicleTypeList: any = [];
  public vehicleTypedata: any = [];
  public scale = 1;
  public rich = {
    yellow: {
      color: "#ffc72b",
      fontSize: 30 * this.scale,
      padding: [5, 4],
      align: "center"
    },
    total: {
      color: "#ffc72b",
      fontSize: 40 * this.scale,
      align: "center"
    },
    white: {
      color: "#fff",
      align: "center",
      fontSize: 14 * this.scale,
      padding: [21, 0]
    },
    blue: {
      color: "#49dff0",
      fontSize: 16 * this.scale,
      align: "center"
    },
    hr: {
      borderColor: "#0b5263",
      width: "100%",
      borderWidth: 1,
      height: 0
    }
  };
  option = {
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      position: [1, -16]
    },

    series: [
      {
        name: "车型分布",
        type: "pie",
        radius: ["30%", "45%"],
        center: ["55%", "50%"],
        data: [],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
            formatter: "{d}% \r\n {b}",
            color: "#fff"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "12"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        color: [
          "#DFC72F",
          "#3CDAFF",
          "#055BE9",
          "#FF4D9B",
          "#BE6CFF",
          "#846BFF"
        ]
      }
    ]
  };

  created() {
    api_ccp.ccp().then(res => {
      this.vehicleTypeList = res.vehicleTypeList;
      this.initchart();
    });
  }
  initchart() {
    this.vehicleTypeList.forEach((ele, index) => {
      this.option.series[0].data.push({ value: ele.counts, name: ele.carType });

      if (index <= 2) {
        this.vehicleTypedata.push({
          index: index + 1,
          name: ele.carType,
          value: ele.counts
        });
      }
    });
    var main = document.getElementById("main");
    main.style.height = document.getElementById("s1").offsetHeight + "px";
    this.myChart = echarts.init(main);
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
  margin-right: 10px;
}

.about-car-item {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.item-name,
.item-value {
  font-size: 0.9vw;
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
  width: 50%;
  font-size: 0.74vw !important;
}

.left-label-item1,
.left-label-item2,
.left-label-item3 {
  width: 35%;
}

.left-label-icon1 {
  background-color: #055be9;
}
.left-label-icon2 {
  background-color: #846bff;
}
.left-label-icon3 {
  background-color: #3cdaff;
}
.left-label-icon4 {
  background-color: #be6cff;
}
.left-label-icon5 {
  background-color: #dfc72f;
}
.left-label-icon6 {
  background-color: #ff4d9b;
}
.left-label-item {
  font-size: 0.16rem;
}
.left-label-item6 {
  text-align: center;
}

#main {
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

.car-type {
  background: url("../../../assets/img/cartypetop3@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  padding-top: 0rem;
  height: 29vh;
  color: #fff;
  /* width: 30.66667%; */
  width: inherit;
  padding-top: 1.5%;
  margin-top: 5vh;
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

.car-type-text {
  position: absolute;
  top: 5.5vh;
  color: #fff;
  font-size: 1vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
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
  /* margin: 4px 1px;
    margin-right: 14px; */
}

.about-car-item-box {
  margin-bottom: 10px;
}

.left-label-banner {
  flex-direction: row;
  flex-wrap: wrap;
  /* margin-bottom: 12% */
}
</style>