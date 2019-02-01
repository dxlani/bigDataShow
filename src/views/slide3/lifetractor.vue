<template>
  <div class="lifeleft">
    <div class="lefthead">{{productName}}</div>
    <div class="lefttype">
      型号名称
      <select class="nameselect" v-model="typename" @change="changevalue()">
        <option v-for="(p, key) in productarr" :value="key">{{p}}</option>
      </select>
    </div>
    <div class="lefttitle">热门配件Top3</div>
    <div class="leftpart">
      <div class="parthead">
        {{enginename}}
        <p style="margin-top:5px">当前平均寿命：{{engineavglife}}天</p>
      </div>
      <div class="position">
        <div class="positionico" v-bind:style="{'margin-left':engineleft}">
          <div class="positionfont">实际寿命
            <!-- <img src="../../assets/img/Combined.png" height="30">&nbsp;&nbsp; -->
          </div>
        </div>
      </div>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="60"
          aria-valuemin="0"
          aria-valuemax="100"
          v-bind:style="{'width':engineavg}"
        >
          <!-- 1.32 -->
          <!-- <span class="sr-only">40% 完成</span> -->
        </div>
      </div>
      <div class="triangle-up"></div>
      <div class="desfont">
        <div class="desfontl">{{engineminlife}}天</div>
        <div class="desfontm">预期：{{enginelifeday}}天</div>
        <div class="desfontr">{{enginemaxlife}}天</div>
      </div>
    </div>
    <div class="leftbottom">
      <div class="bottoml">
        <div class="bottomhead">
          {{part1name}}
          <p style="margin-top:5px">当前平均寿命：{{part1avglife}}天</p>
        </div>
        <div class="gauge" id="chart3"></div>
        <div class="bottomfont">
          <div class="bfl">{{part1minlife}}天</div>
          <div class="bfr">{{part1maxlife}}天</div>
        </div>
      </div>
      <div class="bottomr">
        <div class="bottomhead">
          {{part2name}}
          <p style="margin-top:5px">当前平均寿命：{{part2avglife}}天</p>
        </div>
        <div class="gauge" id="chart4"></div>
        <div class="bottomfont">
          <div class="bfl">{{part2minlife}}天</div>
          <div class="bfr">{{part2maxlife}}天</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as echarts from "echarts";
@Component({})
export default class lifetractor extends Vue {
  myChart3 = null;
  myChart4 = null;

  public productName: string = "";
  public productarr: Array<any> = [];
  public listmodel: Array<any> = [];
  public list: Array<any> = [];

  public engine: Array<any> = [];
  public engineminlife: string = "";
  public enginemaxlife: string = "";
  public enginereallife: string = "";
  public engineavglife: string = "";
  public engineavg: any = "";
  public engineleft: any = "";
  public enginename: string = "";
  public enginelifeday: string = "";

  public part1: Array<any> = [];
  public part1minlife: string = "";
  public part1maxlife: string = "";
  public part1reallife: string = "";
  public part1avglife: string = "";
  public part1avg: any = "";
  public part1name: string = "";
  public part1lifeday: string = "";

  public part2: Array<any> = [];
  public part2minlife: string = "";
  public part2maxlife: string = "";
  public part2reallife: string = "";
  public part2avglife: string = "";
  public part2avg: any = "";
  public part2name: string = "";
  public part2lifeday: string = "";

  public typename: number = 0;
  @Prop()
  lifedata:any
 
  option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
      {
        name: "实际寿命",
        type: "gauge",
        radius: "100%",
        startAngle: 200,
        endAngle: -20,
        center: ["50%", "50%"],
        splitNumber: 14, // 分割段数，默认为5
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[], [1, "#C3C9DF"]],
            width: 28
          }
        },
        axisTick: {
          // 坐标轴小标记--短分割线
          splitNumber: 10, // 每份split细分多少段
          length: 12, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto"
          },
          show:false,
        },
        axisLabel: {
          // 坐标轴文本标签，详见axis.axisLabel
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: "auto"
          },
          show: false
        },
        splitLine: {
          // 分隔线
          show: true, // 默认显示，属性show控制显示与否
          length: 28, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            color: "#354C94",
            width: 3,
            type: "solid"
          }
        },
        //指针
        pointer: {
          show: true,
          length: "40%",
          width: 5,
          color: " #242A4B"
        },
        itemStyle: {
            // 指针颜色，默认取数值所在的区间的颜色
            color: "#fff", 
            borderWidth:0,          
        },
        title: {
          show: true,
          offsetCenter: [0, "-40%"], // x, y，单位px
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: "bolder",
            color: "#13E0E9",
            fontSize: 12,
          }
        },
        detail: {
          formatter: "", //'预期：{value}天',
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: "#DCDFE6",
            fontWeight: "normal",
            fontSize: 14
          }
        },
        data: [
          // { value: 50, name: '实际寿命' }
        ],        
      },
      // {
      //   name: "中圆形",
      //   type: "pie",
      //   hoverAnimation: false,
      //   legendHoverLink: false,
      //   radius: ["0%", "20%"],
      //   z: -10,
      //   label: {
      //     normal: {
      //       show: false,
      //       position: "center"
      //     },
      //     emphasis: {
      //       show: false
      //     }
      //   },
      //   labelLine: {
      //     normal: {
      //       show: false
      //     }
      //   },
      //   data: [
      //     {
      //       value: 0,
      //       name: "1",
      //       itemStyle: {
      //         normal: {
      //           color: "transparent"
      //         }
      //       }
      //     },
      //     {
      //       value: 100,
      //       name: "2",
      //       itemStyle: {
      //         normal: {
      //           color: "#242A4B"
      //         }
      //       }
      //     }
      //   ]
      // }
    ]
  };
  option2 = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
      {
        name: "实际寿命",
        type: "gauge",
        radius: "100%",
        startAngle: 200,
        endAngle: -20,
        center: ["50%", "50%"],
        splitNumber: 14, // 分割段数，默认为5
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [[], [1, "#C3C9DF"]],
            width: 28
          }
        },
        axisTick: {
          // 坐标轴小标记
          splitNumber: 10, // 每份split细分多少段
          length: 12, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto"
          },
          show:false,
        },
        axisLabel: {
          // 坐标轴文本标签，详见axis.axisLabel
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: "auto"
          },
          show: false
        },
        splitLine: {
          // 分隔线
          show: true, // 默认显示，属性show控制显示与否
          length: 28, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            color: "#354C94",
            width: 3,
            type: "solid"
          }
        },
        pointer: {
          show: true,
          length: "40%",
          width: 5,
          color: " #242A4B"
        },
        itemStyle: {
            // 指针颜色，默认取数值所在的区间的颜色
            color: "#fff", 
            borderWidth:0,          
        },
        title: {
          show: true,
          offsetCenter: [0, "-40%"], // x, y，单位px
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: "bolder",
            color: "#13E0E9",
            fontSize: 12,
          }
        },
        detail: {
          formatter: "", //'预期：{value}天',
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: "#DCDFE6",
            fontWeight: "normal",
            fontSize: 14
          }
        },
        data: [
          // { value: 70, name: '实际寿命' }
        ]
      },
      // {
      //   name: "中圆形",
      //   type: "pie",
      //   hoverAnimation: false,
      //   legendHoverLink: false,
      //   radius: ["0%", "20%"],
      //   z: -10,
      //   label: {
      //     normal: {
      //       show: false,
      //       position: "center"
      //     },
      //     emphasis: {
      //       show: false
      //     }
      //   },
      //   labelLine: {
      //     normal: {
      //       show: false
      //     }
      //   },
      //   data: [
      //     {
      //       value: 0,
      //       name: "1",
      //       itemStyle: {
      //         normal: {
      //           color: "transparent"
      //         }
      //       }
      //     },
      //     {
      //       value: 100,
      //       name: "2",
      //       itemStyle: {
      //         normal: {
      //           color: "#242A4B"
      //         }
      //       }
      //     }
      //   ]
      // }
    ]
  };
  mounted() {
    this.init();
    this.GetPartsLifeCycle();
  }
  init() {
    let dom = document.getElementById("chart3");
    let dom2 = document.getElementById("chart4");
    //dom.style.width = "90%";
    //dom2.style.width = "90%";

    if (!this.myChart3) {
      this.myChart3 = echarts.init(dom);
    }
    if (!this.myChart4) {
      this.myChart4 = echarts.init(dom2);
    }
    this.myChart3.clear();
    this.myChart4.clear();

    if (this.option && typeof this.option === "object") {
      this.myChart3.setOption(this.option, true);
    }
    if (this.option2 && typeof this.option2 === "object") {
      this.myChart4.setOption(this.option2, true);
    }
  }
  GetPartsLifeCycle() {
    var list = this.lifedata[0].data.listProduct;
    var arr = list[1]; //拖拉机械
    this.productName = arr["productName"];
    this.listmodel = arr["listModel"];
    this.listmodel.forEach((val, idx) => {
      this.productarr.push(val.modelName);
    });
    this.getdata(0);
    this.init();
  }
  getdata(key) {
    this.list = this.listmodel[key];
    this.engine = this.list["listParts"][0]; //发动机
    this.engineminlife = this.engine["minLifeDays"];
    this.enginemaxlife = this.engine["maxLifeDays"];
    this.enginelifeday = this.engine["lifeDays"];
    this.enginereallife = this.engine["realLifeDays"];
    this.engineavglife = this.engine["avgLifeDays"];
    this.engineavg = Math.floor(
      ((this.engine["realLifeDays"] - this.engine["minLifeDays"]) /
        (this.engine["maxLifeDays"] - this.engine["minLifeDays"])) *
        100
    );
    this.engineleft = Math.floor(this.engineavg / 1.25) + "%";
    this.engineavg = this.engineavg + "%";
    this.enginename = this.engine["partsName"];

    this.part1 = this.list["listParts"][1]; //零件1
    this.part1minlife = this.part1["minLifeDays"];
    this.part1maxlife = this.part1["maxLifeDays"];
    this.part1lifeday = this.part1["lifeDays"];
    this.part1reallife = this.part1["realLifeDays"];
    this.part1avglife = this.part1["avgLifeDays"];
    this.part1avg = Math.floor(
      ((this.part1["realLifeDays"] - this.part1["minLifeDays"]) /
        (this.part1["maxLifeDays"] - this.part1["minLifeDays"])) *
        100
    );
    this.option.series[0].data = [];
    this.option.series[0].axisLine.lineStyle.color[0] = [];
    this.option.series[0].data.push({
      value: this.part1avg,
      name: "实际寿命"
    });
    this.part1avg = this.part1avg / 100;
    this.option.series[0].axisLine.lineStyle.color[0].push(this.part1avg);
    this.option.series[0].axisLine.lineStyle.color[0].push("#0DD59F");
    this.option.series[0].detail.formatter =
      "预期：" + this.part1lifeday + "天";
    this.option.tooltip.formatter = "实际寿命：" + this.part1reallife + "天";
    this.part1name = this.part1["partsName"];

    this.part2 = this.list["listParts"][2];
    this.part2minlife = this.part2["minLifeDays"];
    this.part2maxlife = this.part2["maxLifeDays"];
    this.part2lifeday = this.part2["lifeDays"];
    this.part2reallife = this.part2["realLifeDays"];
    this.part2avglife = this.part2["avgLifeDays"];
    this.part2avg = Math.floor(
      ((this.part2["realLifeDays"] - this.part2["minLifeDays"]) /
        (this.part2["maxLifeDays"] - this.part2["minLifeDays"])) *
        100
    );
    this.option2.series[0].data = [];
    this.option2.series[0].axisLine.lineStyle.color[0] = [];
    this.option2.series[0].data.push({
      value: this.part2avg,
      name: "实际寿命"
    });
    this.part2avg = this.part2avg / 100;
    this.option2.series[0].axisLine.lineStyle.color[0].push(this.part2avg);
    this.option2.series[0].axisLine.lineStyle.color[0].push("#13E0E9");
    this.option2.series[0].detail.formatter =
      "预期：" + this.part2lifeday + "天";
    this.option2.tooltip.formatter = "实际寿命：" + this.part2reallife + "天";
    this.part2name = this.part2["partsName"];
  }
  changevalue() {
    this.getdata(this.typename);
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.lifeleft {
  width: 100%;
  height: 100%;
}
.lefthead {
  width: 100%;
  //height: 40px;
  font-size: 30px;
  color: #13e0e9;
  letter-spacing: 0;
}
.lefttype {
  width: 100%;
  //height: 42px;
  margin-top: 5%;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
}
.nameselect {
  width: 60%;
  height: 4vh;
  background: #0a275a;
  border: 1px solid rgba(139, 170, 236, 0.2);
  border-radius: 4px;
  margin-left: 20px;
  font-size: 16px;
  color: #dcdfe6;
  letter-spacing: 0;
  line-height: 16px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../../assets/img/arrow.png") no-repeat scroll right center
    transparent;
  background-position: 95% 15px;
  padding-left: 20px;
  background-color: rgba(53, 76, 148, 0.2);
  background-size: 10px 10px;
}
option {
  color: #dcdfe6;
  background: #0a275a;
  text-indent: 20px;
}
.lefttitle {
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: #fff;
  letter-spacing: 0;
  margin-top: 5%;
}
.leftpart {
  width: 100%;
  height: 24vh;
  margin-top: 10px;
  background: linear-gradient(
        to left,
        rgba(15, 252, 255, 1),
        rgba(15, 252, 255, 1)
      )
      left top no-repeat,
    linear-gradient(to bottom, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1))
      left top no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) right
      top no-repeat,
    linear-gradient(to bottom, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1))
      right top no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) left
      bottom no-repeat,
    linear-gradient(to bottom, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1))
      left bottom no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) right
      bottom no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) right
      bottom no-repeat;
  background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
  border: 1px solid rgba(139, 170, 236, 0.2);
  background-color: rgba(53, 76, 148, 0.2);
  position: relative;
}
.parthead {
  width: 33%;
  height: auto;
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  color: #c0c4cc;
  padding-top: 20px;
}
.parthead p {
  font-size: 13px;
}
.progress {
  width: 70%;
  height: 4vh;
  margin: 5px auto;
  margin-top: 5px;
  margin-left: 60px;
  //background: #13123a;
  background: url("../../assets/img/engine_bg.png") no-repeat opacify($color: #06051a, $amount: 0);
  background-size: 140%;
  z-index: 1000;
  opacity:1;
  position: relative;
}
.progress-bar { 
  background: url("../../assets/img/engine_bg2.png");
  //background-size: 200%;
  background-size: cover;
  //background-image: linear-gradient(-90deg,#ffc73e 0%, #0bff5e 100% );
  height: 4vh;
  transition: all .5s;
}
.triangle-up{
  width:0;
  height:0;
  border-left:5px solid transparent;
  border-right:5px solid transparent;
  border-bottom:10px solid #fff;
  margin-left: 36%;
}
.position {
  width: 85%;
  height: 32px;
  margin: 30px auto;
  margin-bottom: 0px;
  margin-left: 60px;
}
.positionico {
  float: left;
  height: 30px;
}
.positionfont {
  width: 80px;
  height: 30px;
  line-height: 24px;
  font-size: 14px;
  color: #13e0e9;
  letter-spacing: 0;
  background: url("../../assets/img/Combined.png") no-repeat top center;
  background-size: 16px 24px;
  background-position: 0px 0px;
  text-indent: 20px;
}
.desfont {
  width: 70%;
  height: 20px;
  margin: 5px auto;
  font-size: 12px;
  color: #dcdfe6;
}
.desfontl {
  width: 34px;
  height: 16px;
  float: left;
  color: #c0c4cc;
}
.desfontm {
  width: 100px;
  height: 16px;
  float: left;
  margin-left: 50px;
  font-size: 14px;
}
.desfontr {
  width: auto;
  height: 16px;
  float: right;
}

.leftbottom {
  width: 100%;
  height: 30vh;
  margin-top: 4%;
  background: linear-gradient(
        to left,
        rgba(15, 252, 255, 1),
        rgba(15, 252, 255, 1)
      )
      left top no-repeat,
    linear-gradient(to bottom, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1))
      left top no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) right
      top no-repeat,
    linear-gradient(to bottom, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1))
      right top no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) left
      bottom no-repeat,
    linear-gradient(to bottom, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1))
      left bottom no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) right
      bottom no-repeat,
    linear-gradient(to left, rgba(15, 252, 255, 1), rgba(15, 252, 255, 1)) right
      bottom no-repeat;
  background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
  border: 1px solid rgba(139, 170, 236, 0.2);
  background-color: rgba(53, 76, 148, 0.2);
}
.bottoml {
  width: 50%;
  height: 30vh;
  float: left;
  position: relative;
}
.bottomhead {
  width: auto;
  height: auto;
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  color: #c0c4cc;
  margin-top: 4vh;
}
.bottomhead p {
  font-size: 13px;
}
.gauge {
  width: 100%;
  height: 170px;
  margin: 30px auto;
  margin-bottom: 0px;
}


.bottomr {
  width: 50%;
  height: 30vh;
  float: left;
  position: relative;
}
.bottomfont {
  width: 100%;
  //position: absolute;
  height: 20px;
  //top: 240px;
  margin-top: -40px;
  color: #c0c4cc;
  font-size: 12px;
}
.bfl {
  width: 60px;
  height: 20px;
  float: left;
  margin-left: 50px;
}
.bfr {
  width: 60px;
  height: 20px;
  float: right;
  margin-right: 20px;
}
.clear{
  clear: both;
}
</style>