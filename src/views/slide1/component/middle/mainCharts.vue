<template>
  <div class="main-container">
    <div class="trade-num-container">
      <div class="title">平台累计交易额</div>
      <div class="trade-num">
        <span class="trade-num-box">
          <span class="trade-num-box-0">{{total_trade_num[0]}}</span>
        </span>
        <span class="trade-num-tag">,</span>
        <span class="trade-num-box">
          <span class="trade-num-box-1">{{total_trade_num[1]}}</span>
        </span>
        <span class="trade-num-box">
          <span class="trade-num-box-2">{{total_trade_num[2]}}</span>
        </span>
        <span class="trade-num-box">
          <span class="trade-num-box-3">{{total_trade_num[3]}}</span>
        </span>
        <span class="trade-num-tag">,</span>
        <span class="trade-num-box">
          <span class="trade-num-box-4">{{total_trade_num[4]}}</span>
        </span>
        <span class="trade-num-box">
          <span class="trade-num-box-5">{{total_trade_num[5]}}</span>
        </span>
        <span class="trade-num-box">
          <span class="trade-num-box-6">{{total_trade_num[6]}}</span>
        </span>
        <span class="trade-num-tag">,</span>
        <span class="trade-num-box">
          <span class="trade-num-box-7">{{total_trade_num[7]}}</span>
        </span>
        <span class="trade-num-box">
          <span class="trade-num-box-8">{{total_trade_num[8]}}</span>
        </span>
        <span class="trade-num-box">
          <span class="trade-num-box-9">{{total_trade_num[9]}}</span>
        </span>
        <span class="trade-num-tag">元</span>
      </div>
      <div class="trade-detail">
        <div class="month-trade">
          <p class="text">月度交易额(元)</p>
          <div class="month-trade-detail">
            <span class="month-trade-num">{{month_trade_str}}</span>
          </div>
        </div>
        <div class="quater-trade">
          <p class="text">季度交易额(元)</p>
          <div class="quater-trade-detail">
            <span class="quater-trade-num">{{quater_trade_str}}</span>
          </div>
        </div>
        <div class="year-trade">
          <p class="text">年度交易额(元)</p>
          <div class="year-trade-detail">
            <span class="year-trade-num">{{year_trade_str}}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="main-chart-container"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { Vue, Component } from "vue-property-decorator";

import cityCoordinate from "./cityLocation";

import {
  getStrWithSimonFromNum,
  GetInTransitOrder,
  transformDate,
  getTransactionSum,
  GetCapacityList
} from "../../../../api/nuode/api_nuode";
@Component({})
export default class MainCharts extends Vue {
  total_trade_num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  month_trade: number = 0;
  month_trade_str: string = "";
  quater_trade: number = 0;
  quater_trade_str: string = "";
  year_trade: number = 0;
  year_trade_str: string = "";
  first_get_trade = {
    year: true,
    quater: true,
    month: true
  }; // 是否第一次获取到这些数据
  chart = null;

  randomValue() {
    return Math.round(Math.random() * 1000);
  }
  bg = document.getElementById("bg");
  ph01 =
    "path://M285.213103,174.984725 L414.493286,174.984725 L414.493286,167.269662 L285.213103,167.269662 L285.213103,174.984725 Z M457.731903,90.2719812 C446.005956,90.3424299 437.282408,100.027276 437.277773,112.947203 C437.271285,130.523234 437.269431,148.098338 437.322267,165.67437 C437.331536,168.834366 437.615184,171.993435 437.768131,175.058882 L457.731903,175.058882 L457.731903,90.2719812 Z M266.981805,175.325846 L266.981805,90.2404647 C255.93995,90.5982701 246.942951,99.7195267 246.893822,110.613125 C246.808542,129.608327 246.869721,148.604457 246.869721,167.600586 L246.869721,175.039416 C247.868049,175.171971 248.449248,175.313795 249.031374,175.315649 C254.885078,175.332334 260.738782,175.325846 266.981805,175.325846 L266.981805,175.325846 Z M419.430234,75.4786748 C426.282265,64.0242674 433.277047,51.8672267 440.744575,40.0086661 C445.736213,32.082257 446.08382,29.7676454 436.304473,23.2205483 C434.55346,22.0479477 432.490065,21.2943317 430.498044,20.5397887 C415.131029,14.7231336 398.909364,13.40222 382.782248,12.3297307 C360.801428,10.8669926 338.756648,10.5740742 316.795295,13.1371103 C307.072492,14.2707786 297.206939,14.8844242 287.717728,17.0813122 C280.282644,18.8035983 272.995872,21.9914033 266.26249,25.6640068 C260.858358,28.61173 260.737855,32.3418049 263.949744,37.6291675 C266.27176,41.452865 268.584506,45.2821243 270.874078,49.1262149 C276.293041,58.2270785 281.695319,67.3381386 286.524741,75.4675513 C331.160274,66.6911227 374.901299,66.6577522 419.430234,75.4786748 L419.430234,75.4786748 Z M469.479169,542.848529 L469.479169,371.647918 C455.820527,370.784921 450.140163,362.428404 450.510944,350.562427 C450.896556,338.218141 450.915095,325.844193 450.529483,313.500833 C450.145725,301.230704 457.221152,293.718645 470.222585,293.066994 C470.222585,275.343576 470.566484,257.584008 470.100227,239.845759 C469.792479,228.147562 460.843681,218.599905 447.624415,218.695382 C383.832485,219.159787 320.034993,218.900239 256.239355,218.909509 C245.823192,218.911363 236.976359,227.26788 236.71774,237.696146 C236.415553,249.881922 236.434092,262.076041 236.353447,274.267379 C236.308954,281.036946 236.346032,287.80744 236.346032,294.387908 C247.903273,298.435929 252.301662,303.349728 252.392503,312.612809 C252.531546,326.822132 252.535254,341.035164 252.386941,355.245414 C252.30537,363.064296 247.677097,369.620663 240.42833,371.612693 C236.823412,372.602683 236.475805,374.438058 236.479513,377.516482 C236.539765,431.581248 236.51381,485.646014 236.506395,539.709852 C236.505468,541.217084 236.506395,542.724317 236.506395,544.088797 C249.485581,547.961623 254.160201,553.054325 254.25475,563.581775 C254.376181,577.018944 254.377108,590.45982 254.251969,603.896988 C254.165763,613.201782 248.853399,620.205869 240.801892,622.107985 C239.468934,622.422223 238.117438,622.656744 236.673246,622.948735 C236.673246,634.077781 236.494344,644.998261 236.728863,655.910398 C236.92445,665.055756 246.437762,674.288247 256.238428,674.231703 C320.803436,673.861847 385.373079,674.041677 449.940869,674.039823 C458.931379,674.039823 465.66476,669.519981 468.382584,660.873326 C472.457467,647.907052 468.990665,634.636736 470.154917,621.62504 C459.312356,620.000085 452.757877,614.359552 452.585463,606.057725 C452.263811,590.631307 452.304597,575.193765 452.451055,559.76364 C452.517796,552.778092 456.323862,547.851316 462.540004,544.924912 C464.71278,543.901552 467.185889,543.514084 469.479169,542.848529 L469.479169,542.848529 Z M217.207248,77.9193525 L197.290751,77.9193525 C195.27463,63.150147 203.936072,51.1404924 217.298089,49.9224709 C218.182402,43.5913548 218.681102,37.1490038 220.028891,30.8883364 C225.071511,7.46598747 238.022889,0.565719737 257.327597,0.377547471 C321.115819,-0.243513704 384.914238,0.0355003462 448.707095,0.271874375 C457.293454,0.303390913 465.864982,2.17584401 473.008076,7.69123802 C482.063473,14.6832745 485.030648,24.7926673 486.926265,35.4044708 C487.305389,37.5272022 487.896784,39.6916468 487.791112,41.8069626 C487.525076,47.119353 488.821883,50.6705252 493.724533,54.2587757 C501.087315,59.6490305 502.068958,68.7814106 502.719678,77.9212064 L488.376019,77.9212064 C488.376019,83.014835 488.376945,87.7284113 488.376019,92.4419875 C488.365822,284.747555 488.351918,477.054049 488.356553,669.359617 C488.356553,674.762849 488.691182,680.167935 488.617953,685.568387 C488.481691,695.489607 483.896058,699.979787 474.048117,699.988129 C447.634611,700.009449 421.221106,699.995545 394.8076,699.995545 C340.898835,699.995545 286.990998,699.996472 233.082233,699.994618 C221.486987,699.993691 217.207248,695.718566 217.207248,684.157558 L217.207248,84.5202132 L217.207248,77.9193525 Z";
  ph02 = "path://M0,350 L700,350";
  ph03 =
    "points://227.547837 276 478.140625 276.484375 478.582031 331.652344 230.055235 332.298762 230.055235 394.672646 478.251954 394.672646 478.251954 450.879834 227.055142 450.879834 227.055142 505.880553 477.25 507.125 476.332031 566.722656 227 564.150183 227 619.32976 479.575195 619.32976";
  planePath = this.ph01 + this.ph02 + this.ph03;
  province_capital = [
    { pro: "北京", cap: "北京" },
    { pro: "上海", cap: "上海" },
    { pro: "天津", cap: "天津" },
    { pro: "重庆", cap: "重庆" },
    { pro: "黑龙江", cap: "哈尔滨" },
    { pro: "吉林", cap: "长春" },
    { pro: "辽宁", cap: "沈阳" },
    { pro: "内蒙古", cap: "呼和浩特" },
    { pro: "河北", cap: "石家庄" },
    { pro: "新疆", cap: "乌鲁木齐" },
    { pro: "甘肃", cap: "兰州" },
    { pro: "青海", cap: "西宁" },
    { pro: "陕西", cap: "西安" },
    { pro: "宁夏", cap: "银川" },
    { pro: "河南", cap: "郑州" },
    { pro: "山东", cap: "济南" },
    { pro: "山西", cap: "太原" },
    { pro: "安徽", cap: "合肥" },
    { pro: "湖北", cap: "武汉" },
    { pro: "湖南", cap: "长沙" },
    { pro: "江苏", cap: "南京" },
    { pro: "四川", cap: "成都" },
    { pro: "贵州", cap: "贵阳" },
    { pro: "云南", cap: "昆明" },
    { pro: "广西", cap: "南宁" },
    { pro: "西藏", cap: "拉萨" },
    { pro: "浙江", cap: "杭州" },
    { pro: "江西", cap: "南昌" },
    { pro: "广东", cap: "广州" },
    { pro: "福建", cap: "福州" },
    { pro: "台湾", cap: "台北" },
    { pro: "海南", cap: "海口" },
    { pro: "香港", cap: "香港" },
    { pro: "澳门", cap: "澳门" }
  ];
  MAPData = [];
  convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = cityCoordinate[dataItem[0].name];
      var toCoord = cityCoordinate[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord]
        });
      }
    }
    return res;
  };
  series = [
    {
      name: "",
      type: "lines",
      zlevel: 1,
      effect: {
        show: false,
        period: 6,
        trailLength: 0.7,
        color: "#04a675",
        symbolSize: 3
      },
      lineStyle: {
        normal: {
          color: "#04a675",
          width: 0,
          curveness: 0.2
        }
      },
      data: this.convertData(this.MAPData)
    },
    {
      name: "",
      type: "lines",
      zlevel: 2,
      symbol: ["none", "none"],
      symbolSize: 10,
      effect: {
        show: false,
        period: 6,
        trailLength: 0,
        symbol:this.planePath,
        symbolSize: 20
      },
      lineStyle: {
        normal: {
          color: "#ec1c20",
          width: 1,
          opacity: 0.6,
          curveness: 0.2
        }
      },
      data: this.convertData(this.MAPData)
    },
    {
      name: "",
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 3,
      rippleEffect: {
        brushType: "stroke"
      },
      label: {
        normal: {
          show: false,
          position: "right",
          formatter: "{b}"
        }
      },
      symbolSize: function(val) {
        return val[2] / 8;
      },
      itemStyle: {
        normal: {
          color: "#ec1c20"
        }
      },
      data: this.MAPData.map(item => {
        console.log(item);
        
        if (!cityCoordinate[item[1].name]) {
          return null;
        }
        return {
          name: item[1].name,
          value: cityCoordinate[item[1].name].concat([item[1]["value"]])
        };
      })
    },
    {
      type: "scatter",
      coordinateSystem: "geo",
      data: this.convertData([]),
      symbolSize: 20,
      // symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      symbolRotate: 35,
      zlevel: 4,
      label: {
        normal: {
          formatter: "{b}",
          position: "top",
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: "#00cfff"
        }
      }
    },
    {
      name: "该省车辆",
      type: "map",
      zlevel: 5,
      geoIndex: 0,
      tooltip: {show: true},
      data: null
    }
  ];






  option = {
    tooltip: {},
    title: {
      text: "",
      subtext: "",
      left: "center",
      textStyle: {
        color: "#e0fff"
      }
    },
    visualMap: {
      min: 0,
      max: 1500,
      seriesIndex: [4],
      inRange: {
        color: ["#011365", "#011365"]
      },
      itemWidth: 0,
      itemHeight: 0,
      calculable: false
    },
    geo: {
      map: "china",
      roam: false,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#f3f4f6"
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: "#0048e8",
          areaColor: "#011365",
          borderWidth: 2,
          // shadowColor: "rgba(0,54,255, 1)",
          // shadowBlur: 100
        },
        emphasis: {
          areaColor: "#065bea",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    },
    series: this.series
  };
  ramdomList = [];

  created() {
    this.ramdomList = this.getRandomCitys();
    var app = {};
    this.loadProcinceCars();
    var color = ["#a6c84c", "#ffa022", "#46bee9"];

    this.loadTradeNum();
    this.loadData();

    
  }

  mounted() {
   window.addEventListener('resize',()=>{
     this.chart.resize()
   }) 
  }

  async loadData() {
    const res1 = await GetInTransitOrder();
    this.drawLineFromList(res1.data);
  }

  drawLineFromList(list) {
    var anotherList = list.map(line => {
      if (
        cityCoordinate[line.originCity] &&
        cityCoordinate[line.destinationCity]
      ) {
        return [
          { name: line.originCity },
          { name: line.destinationCity, value: 20 }
        ];
      } else {
        return null;
      }
    });
    let i = 0;
    while (i < anotherList.length) {
      if (!anotherList[i]) {
        anotherList.splice(i, 1);
      } else {
        i++;
      }
    }
    this.MAPData = anotherList;
  
    

    this.series[0].data = this.convertData(this.MAPData.slice(0,200));
    this.series[1].data = this.convertData(this.MAPData.slice(0,200));
    this.series[2].data = this.MAPData.slice(0,200).map(item => {
      return {
        name: item[1].name,
        value: cityCoordinate[item[1].name].concat([item[1]["value"]])
      };
    });

 
  

    this.animate();
  }

  animate() {
    var dom = document.getElementById("main-chart-container");
    if (!this.chart) {
      this.chart = echarts.init(dom);
    }

    this.chart.clear();
    if (this.option && typeof this.option === "object") {
      this.chart.setOption(this.option, true);
    }
  }

  /**
   * 加载交易额
   */
  loadTradeNum() {
    this.loadTotalTradeNum();
    this.getMonthTradeNum();
    this.getQuarterTradeNum();
    this.getYearTradeNum();
  }
  /**
   * 加载来货拉平台累计交易额
   */
  async loadTotalTradeNum() {
    const res = await getTransactionSum();
    var total = Math.floor(res.data[0].sumFeeAmount);
    this.slideToNum(total);
  }
  /**
   * 获取本月交易额
   */
  async getMonthTradeNum() {
  
    const res = await getTransactionSum();

    this.raiseToNum("month", Math.floor(res.data[0].sumFeeAmount));
  }
  /**
   * 获取季度交易额
   */
  async getQuarterTradeNum() {
   
    const res = await getTransactionSum();

    this.raiseToNum("quater", Math.floor(res.data[0].sumFeeAmount));
  }


  /**
   * 获取年度交易额
   */
 async getYearTradeNum() {
      const res = await getTransactionSum();

    this.raiseToNum("year", Math.floor(res.data[0].sumFeeAmount));
  }

  /**
   * 获取每个省份的车辆
   */
async  loadProcinceCars() {
   
    const res = await GetCapacityList();
   
     var pvl = res.data.data.provinceVehiclesList;//
            this.series[4].data = [];
            var max = 0;
            pvl.forEach(element => {
                var num = Number(element.counts);
                if (num > max) {
                    max = num
                }
                let temp: { name: string, value: number } = { name: element.province, value: num };
                this.series[4].data.push(temp);
                // this.series[4].data.push({name:element.province,value:10});
            });
            this.option.visualMap.max = max;
            this.animate();
 
  }

  /**
   * 从二十个省份中随机获取十个
   */
  getRandomCitys() {
    let citys = [
      { OriginCityName: "镇江", DestinationCityName: "北京" },
      { OriginCityName: "镇江", DestinationCityName: "天津" },
      { OriginCityName: "镇江", DestinationCityName: "石家庄" },
      { OriginCityName: "镇江", DestinationCityName: "太原" },
      { OriginCityName: "镇江", DestinationCityName: "呼和浩特" },
      { OriginCityName: "镇江", DestinationCityName: "沈阳" },
      { OriginCityName: "镇江", DestinationCityName: "长春" },
      { OriginCityName: "镇江", DestinationCityName: "哈尔滨" },
      { OriginCityName: "镇江", DestinationCityName: "上海" },
      { OriginCityName: "镇江", DestinationCityName: "杭州" },
      { OriginCityName: "镇江", DestinationCityName: "合肥" },
      { OriginCityName: "镇江", DestinationCityName: "厦门" },
      { OriginCityName: "镇江", DestinationCityName: "南昌" },
      { OriginCityName: "镇江", DestinationCityName: "济南" },
      { OriginCityName: "镇江", DestinationCityName: "武汉" },
      { OriginCityName: "镇江", DestinationCityName: "长沙" },
      { OriginCityName: "镇江", DestinationCityName: "郑州" },
      { OriginCityName: "镇江", DestinationCityName: "重庆" },
      { OriginCityName: "镇江", DestinationCityName: "成都" },
      { OriginCityName: "镇江", DestinationCityName: "南宁" },
      { OriginCityName: "镇江", DestinationCityName: "西宁" },
      { OriginCityName: "镇江", DestinationCityName: "包头" }
    ];
    let tempList = [],
      indexList = [],
      i = 0;
    for (let i = 0; i < 20; i++) {
      let length = citys.length;
      let tempIndex = Math.floor(Math.random() * length);
      tempList.push(citys[tempIndex]);
      citys.splice(tempIndex, 1);
    }
    return tempList;
  }

  raiseToNum(type, num) {
    let skip = Math.floor(num / 100);
    let i = 0;
    if (this.first_get_trade[type]) {
      let add = () => {
        this[type + "_trade"] += skip;
        this[type + "_trade_str"] = getStrWithSimonFromNum(
          this[type + "_trade"]
        );
        i++;
        if (i < 100) {
          requestAnimationFrame(add);
        } else {
          this[type + "_trade"] = num;
          this[type + "_trade_str"] = getStrWithSimonFromNum(
            this[type + "_trade"]
          );
        }
      };
      add();
      this.first_get_trade[type] = false;
    } else {
      this[type + "_trade"] = num;
      this[type + "_trade_str"] = getStrWithSimonFromNum(this[type + "_trade"]);
    }
  }

  slideToNum(totalTradeNum) {
    let tempList = totalTradeNum.toString().split("");
    while (tempList.length < 10) {
      tempList.unshift("0");
    }
    for (let i = 0; i < 10; i++) {
      if (this.total_trade_num[i] != tempList[i]) {
        $(".trade-num-box-" + i.toString()).animate(
          { top: "0.52rem" },
          250,
          () => {
            this.total_trade_num[i] = tempList[i];
            $(".trade-num-box-" + i.toString()).css({ top: "-0.52rem" });
            $(".trade-num-box-" + i.toString()).animate(
              { top: "2rem" },
              250
            );
          }
        );
      }
    }
    this.total_trade_num = tempList;
  }

  testAdd() {
    let nowNum = Number(this.total_trade_num.join(""));
    let endNum = Math.floor(Math.random() * 100) + nowNum;
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  padding-top: 10%;
}
.trade-num-container {
  width: 100%;
  height: 18.03%;
}
.trade-num-container .title {
  font-family: 微软雅黑;
  font-size: 0.8vw;
  text-align: center;
  margin-top: 1%;
  margin-bottom: 0.2vw;
  font-weight: bold;
}

.title {
  color: #043ac4;
}

div .trade-num {
  font-size: 0rem;
  width: 75.21%;
  height: 3.8rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.trade-num-box {
  display: inline-block;
  width: 6.479%;
  height: 100%;
  background-color: #0049ed;
  color: #fff;
  font-family: Arial;
  text-align: center;
  line-height: 150%;
  margin-right: 1.247%;
  border-radius: 3px;
  overflow: hidden;
}
.trade-num-tag {
  display: inline-block;
  width: 3.601%;
  font-size: 2.48rem;
  font-family: 微软雅黑;
  margin-right: -1.247%;
  margin-top: 2%;
}
.trade-detail {
  width: 75.21%;
  margin: 0 auto;
  margin-top: 1%;
  height: 29.65%;
  font-size: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.trade-detail p {
  display: inline-block;
  width: 100%;
  height: 45.45%;
  text-align: center;
  line-height: 200%;
  margin-bottom: 0rem;
}
.trade-detail > div {
  color: #fff;
  text-align: center;
  float: left;
  border-radius: 0.05rem;
  padding: 0 2%;
}
.trade-detail > div span {
  font-family: Arial;
  font-size: 1.24rem;
}

.quater-trade {
  margin-left: 6.785%;
  margin-right: 6.785%;
}

.trade-num-box-9,
.trade-num-box-8,
.trade-num-box-7,
.trade-num-box-6,
.trade-num-box-5,
.trade-num-box-4,
.trade-num-box-3,
.trade-num-box-2,
.trade-num-box-1,
.trade-num-box-0 {
  position: relative;
  font-size: 3.48rem;
  top: 2rem;
}
#main-chart-container {
  width: 100%;
  height:100%;
  
  position: relative;
  bottom: 15%;
  right: 6%;
  left: 1%;
}

.month-trade-num,
.quater-trade-num,
.year-trade-num {
  color: #fff;
}
</style>