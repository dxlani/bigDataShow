<template>
  <div>
    <div class="car-transaction">
      <div class="car-transaction-text">车辆累计交易次数TOP5</div>
      <div class="car-type-container">
        <div class="about-car car-transaction-header-box">
          <div class="car-transaction-header">
            <div class="item1">排名</div>
            <div class="item2">车牌号</div>
            <div class="item3">累计交易次数</div>
          </div>
        </div>
        <div class="car-transaction-body-box">
           <div class="car-transaction-body" v-for="(item, index) in carTransactionNumTop5List" :key="item.carCode">
            <div class="car-transaction-index-box">
              <div
                class="car-transaction-index"
                :style="{'background-color':index > 2 ? '#01C1F2' : '#055BE9' }"
              >{{index+1}}</div>
            </div>
            <div class="car-transaction-carnums">{{item.carCode}}</div>
            <div class="num">{{item.num}}</div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component,Prop } from "vue-property-decorator";

@Component({
    props:['carTransactionNumTop5List']
})
export default class carTradingNumPanel extends Vue {
}
</script>
<style lang="scss" scoped>
.about-car{
    width: 100%;
    padding-bottom: 0.08rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.car-transaction{
    background: url('../../../assets/img/carfeeamounttop5@3x.png') no-repeat;
     background-size: 100% 100%;
    -moz-background-size:100% 100%;
    -webkit-background-size: 100% 100%; 
    padding-top: 0.00rem;
    height: 29vh;
    padding-top: 1.5%;
    font-size: .2rem;
    position: relative;
    margin-top: 5vh;
    color:#fff;
}
.car-type-container{
    width: 100%;
    margin-top: 2%;
    /*overflow: hidden;*/
    height: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    /*padding-bottom: 10*/
}

.car-transaction-header-box{
   
    height: 20%;
}

.car-transaction-header{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    width: 100%;
}

.item1,.item2,.item3{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #383654
}



.car-transaction-body-box{
    height: 60%;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1%;
}

.car-transaction-body{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    height: 80%;
    width: 100%;
}

.car-transaction-index-box,.car-transaction-carnums,.num{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.car-transaction-index{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9vw;
}



.car-transaction-text{
    position: absolute;
    top: .5vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1vw;
    font-weight: bold;
}

@media screen and (min-width:1080px){
    .car-transaction-text{
        /* top: 1.6%!important */
    }
}
</style>