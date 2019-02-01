
<template>
  <div class="driver-withdraw">
    <div
      class="driver-withdraw-title"
    >{{year}}年{{month}}月{{date}}日&nbsp;星期{{day}}&nbsp;{{hour}}：{{minute}}：{{second}}</div>
    <div class="driver-withdraw-container">
      <div class="about-car">
        <div class="driver-withdraw-car-img"></div>
        <div class="total-car-num">
          <div class="wd-car-pull-right">平台总车辆数</div>
          <div class="wd-pull-left">
            <span class="with-draw-num">{{vehicleInfo.totalVehicleCount}}</span>
            <span class="unit">辆</span>
          </div>
        </div>
        <div class="car-toloal-num">
          <div class="wd-car-pull-right">待运车辆数</div>
          <div class="wd-pull-left">
            <span class="with-draw-num">{{vehicleInfo.shipmentVehicleCount}}</span>
            <span class="unit">辆</span>
          </div>
        </div>
        <div class="car-onroad-num">
          <div class="wd-car-pull-right">在途车辆数</div>
          <div class="wd-pull-left">
            <span class="with-draw-num">{{vehicleInfo.inTransitVehicleCount}}</span>
            <span class="unit">辆</span>
          </div>
        </div>
      </div>
      <div class="about-money">
        <div class="driver-withdraw-money-img"></div>
        <div class="month-withdraw">
          <div class="wd-money-pull-right">当月司机提现金额</div>
          <div class="wd-pull-left">
            <span class="with-draw-num">{{withdrawInfo.withdrawalsMoneyOfMonths}}</span>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="total-withdraw">
          <div class="wd-money-pull-right">累计司机提现金额</div>
          <div class="wd-pull-left">
            <span class="with-draw-num">{{withdrawInfo.totalWithdrawalsMoney}}</span>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="average-withdraw">
          <div class="wd-money-pull-right">平均单笔提现金额</div>
          <div class="wd-pull-left">
            <span class="with-draw-num">{{withdrawInfo.averageWithdrawalsMoney}}</span>
            <span class="unit">元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import {
  GetVehicleCount,
  GetWithdrawalsMoney
} from "../../../../api/nuode/api_nuode";

@Component({})
export default class StormWithdraw extends Vue {
  year = "";
  month = "";
  date = "";
  day = "";
  hour = "";
  minute = "";
  second = "";
  totalCar = 30500;
  carToLoad = 250;
  carOnRoad = 180;
  monthWithdraw = 35080;
  totalWithdraw = 58000;
  averageWithdraw = 5860;
  vehicleInfo = {
    totalVehicleCount: "000",
    shipmentVehicleCount: "0000",
    inTransitVehicleCount: "0000"
  };
  withdrawInfo = {
    withdrawalsMoneyOfMonths: "000",
    totalWithdrawalsMoney: "10000000",
    averageWithdrawalsMoney: "000"
  };

  created() {
    $(".driver-withdraw-car-img,.driver-withdraw-money-img")
      .width(0.32 + "rem")
      .height(0.32 + "rem");
    this.loadData();
    setInterval(() => {
      this.loadData();
    }, 24 * 60 * 1000);
    setInterval(() => {
      let now = new Date();
      this.year = now.getFullYear() + "";
      this.month = (now.getMonth() + 1).toString();
      this.date = now.getDate() + "";
      this.day = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
      this.hour = now.getHours() + "";
      this.minute =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes() + "";
      this.second =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds() + "";
    }, 1000);
  }

  async loadData() {
    //车辆总数
    const res1 = await GetVehicleCount();

    let map = new Map();

    res1.data.forEach(element => {
      map.set(element.key, element.value);
    });

    let date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();

    this.vehicleInfo = map.get(date);

   
    

    //金额
    const res2 = await GetWithdrawalsMoney();

    let map2 = new Map();

    res2.data.forEach(element => {
      map2.set(element.key, element.value);
    });

    this.withdrawInfo = map2.get(date);
  }
}
</script>

<style scoped>

.about-car {
  flex: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10%;
}

.about-line {
  width: 0.5%;
  float: left;
  height: 70%;
  background-color: #00c8f5;
}

.about-money {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 10%
}

.wd-car-pull-right {
  width: 40%;
  color: #fff;
  display: flex;
  justify-content: flex-end;
}

.wd-money-pull-right {
  text-align: center;
  max-width: 50%;
}

.wd-pull-left {
  text-align: center;
  margin-left: 4%;
}

.driver-withdraw {
  background: url("../../../../assets/img/storm/time@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  height: 17%;
  padding-top: 1.5%;
  margin-top: 7%;
}

.driver-withdraw-container {
  width: 100%;
  margin-top: -4%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
}

.with-draw-num {
  font-family: Arial;
  color: #02bceb;
  font-size: .9vw
}

.driver-withdraw-title {
  font-family: 微软雅黑;
  color: #fff;
  text-align: center;
}

.driver-withdraw-car-img {
  background: url("../../../../assets/img/storm/che.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  width: 1.5vw;
  height: 1.5vw;
  margin: 0 auto;
  margin-bottom: 5%;
}

.driver-withdraw-money-img {
  background: url("../../../../assets/img/storm/qian.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  width: 1.5vw;
  height: 1.5vw;
  margin: 0 40%;
  margin-bottom: 5%;
}

.month-withdraw,
.total-withdraw,
.average-withdraw {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8%;
  padding-left: 10%;
}

.total-car-num,
.car-toloal-num,
.car-onroad-num {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8%;
  padding-left: 24%;
}

</style>