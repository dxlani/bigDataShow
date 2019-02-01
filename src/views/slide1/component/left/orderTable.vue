<template>
  <div class="order-list-table" id="order-list-table">
    <div class="live-order-text">实时订单</div>
    <div
      class="item-box"
      v-for="(item, index) in orderList"
      :key="index"
      :class="{o_t_border:item.index!=9}"
    >
      <div class="o-t-box o-t-creationTime">
        <span>{{item.Date}}</span>
        <br>
        <span>{{item.Time}}</span>
      </div>
      <div class="address-box">
        <div class="o-t-box o-t-address">
          <span class="o-t-province">{{item.StartOriginCode}}</span>
        </div>
        <div class="o-t-box o-t-arrow">
          
        </div>
        <div class="o-t-box o-t-end-address">
          <span class="o-t-province">{{item.EndDestinationCode}}</span>
        </div>
      </div>

      <div class="o-t-box o-t-goods">
        <span>{{item.goodsTypeName}}</span>
      </div>
      <div class="o-t-box o-t-state">
        <span>{{item.orderStatus}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { GetRealTimeOrder, trimZero } from "../../../../api/nuode/api_nuode";

@Component({})
export default class StormOrderTable extends Vue {
  public inteval: any;
  orderList = [];

  created() {
    this.getRealTimeOrder();

    this.inteval = setInterval(() => {
      this.getRealTimeOrder();
    }, 30 * 1000);
  }

  async getRealTimeOrder() {
    const res = await GetRealTimeOrder();
  
    let list = res.data.slice(0, 10);
    list = list.map((item, index) => {
      if (typeof item != "object") {
        return;
      }
      item.OrderTime = item.creationTime
        ? item.creationTime
        : item.CarrierOrderTime;
      if (!item.OrderTime) {
        return;
      }

      item.Date = item.OrderTime.split(" ")[0].replace(/-/g, "/");
      item.Time = item.OrderTime.split(" ")[1];
      item.StartOriginCode =
        item.originCode.length > 7
          ? item.originCode.substring(0, 7)
          : item.originCode;
      item.EndDestinationCode =
        item.destinationCode.length > 7
          ? item.destinationCode.substring(0, 7) + "..."
          : item.destinationCode;
      item.StartProvince = item.originCode.replace(item.originCityName, "");
      item.EndProvince = item.destinationCode.replace(
        item.destinationCityName,
        ""
      );
      item.QuantityOfGoods = trimZero(item.quantityOfGoods);
      item.goodsTypeName =
        item.goodsTypeName.length > 5
          ? item.goodsTypeName.substring(0, 5) + "..."
          : item.goodsTypeName;
      if (!item.QuantityOfGoods) {
        return;
      }
      let miniNum = item.QuantityOfGoods.toString().split(".")[1];
      if (miniNum && miniNum.length >= 4) {
        item.QuantityOfGoods = Number(item.QuantityOfGoods).toFixed(4);
        //保留四位后可能出现12.0000这样的情况
        item.QuantityOfGoods = trimZero(item.QuantityOfGoods);
      }
      return item;
    });
    this.orderList = list;

  }
}
</script>

<style scoped>
.order-list-table {
  display: block;
  color: white;
  background: url("../../../../assets/img/storm/liveorder@3x.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  padding-top: 8%;
  height: 44%;
  position: relative;
  margin-top: 4%;
}

ul {
  margin-block-start: 0em;
  margin-block-end: 0em;
}

.order-list-table .item-box {
  height: 8.5%;
   margin: 1% 2% 1% 2%
}

.order-list-table li span {
  display: inline-block;
}

.o-t-box {
  display: inline-block;
}

.o-t-arrow {
  width: 20%;
  background: url("../../../../assets/img/storm/arrow.png") no-repeat;
  background-position: 50% 50%;
  transform: scale(.6)
}

.o-t-creationTime {
  width: 20%;
  padding-left: 1%;
}

.o-t-address {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.o-t-end-address {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.item-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  
}

.o-t-goods {
  width: 25%;
  text-align: center;
}

.o-t-state {
  flex: 1;
  text-align: end;
  margin-right: 0.5%;
}

.o_t_border {
  border-bottom: 1px dashed #004577;
}

.live-order-text {
  position: absolute;
  top: 1.4%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00c1f1;
  font-weight: bold;
  color: #fff;
  left: 0;
}

.address-box{
  display: flex;
    width: 40%;
    justify-content: center
}
</style>