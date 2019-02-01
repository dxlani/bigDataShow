<template>
  <div class="main">
    <div class="maincontent">
      <div class="left">
        <div class="leftdiv">
          <lifeharvester :lifedata="lifedata"></lifeharvester>
        </div>
      </div>

      <div class="middle">
        <div class="middiv">
          <lifetractor :lifedata="lifedata"></lifetractor>
        </div>
      </div>

      <div class="right">
        <div class="rightdiv">
          <lifedryer :lifedata="lifedata"></lifedryer>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { default as lifeharvester } from "./lifeharvester.vue";
import { default as lifetractor } from "./lifetractor.vue";
import { default as lifedryer } from "./lifedryer.vue";
import * as echarts from "echarts";
@Component({
  components: {
    lifeharvester,
    lifetractor,
    lifedryer
  }
})
export default class slide3 extends Vue {
  lifedata = [
    {
      errorMessage: null,
      errorCode: null,
      success: true,
      data: {
        listProduct: [
          {
            productName: "收获机械",
            listModel: [
              {
                modelName: "锐龙尊享版",
                listParts: [
                  {
                    partsName: "发动机",
                    lifeDays: 360,
                    realLifeDays: 379,
                    minLifeDays: 180,
                    maxLifeDays: 531,
                    avgLifeDays: 378
                  },
                  {
                    partsName: "履带",
                    lifeDays: 180,
                    realLifeDays: 167,
                    minLifeDays: 82,
                    maxLifeDays: 203,
                    avgLifeDays: 159
                  },
                  {
                    partsName: "脱粒筒",
                    lifeDays: 360,
                    realLifeDays: 325,
                    minLifeDays: 104,
                    maxLifeDays: 429,
                    avgLifeDays: 344
                  }
                ]
              },
              {
                modelName: "超级锐龙",
                listParts: [
                  {
                    partsName: "发动机",
                    lifeDays: 360,
                    realLifeDays: 389,
                    minLifeDays: 230,
                    maxLifeDays: 490,
                    avgLifeDays: 378
                  },
                  {
                    partsName: "履带",
                    lifeDays: 180,
                    realLifeDays: 154,
                    minLifeDays: 117,
                    maxLifeDays: 198,
                    avgLifeDays: 159
                  },
                  {
                    partsName: "脱粒筒",
                    lifeDays: 360,
                    realLifeDays: 347,
                    minLifeDays: 89,
                    maxLifeDays: 398,
                    avgLifeDays: 344
                  }
                ]
              },
              {
                modelName: "超级飞龙",
                listParts: [
                  {
                    partsName: "发动机",
                    lifeDays: 360,
                    realLifeDays: 395,
                    minLifeDays: 300,
                    maxLifeDays: 476,
                    avgLifeDays: 378
                  },
                  {
                    partsName: "履带",
                    lifeDays: 180,
                    realLifeDays: 157,
                    minLifeDays: 96,
                    maxLifeDays: 209,
                    avgLifeDays: 159
                  },
                  {
                    partsName: "脱粒筒",
                    lifeDays: 360,
                    realLifeDays: 361,
                    minLifeDays: 108,
                    maxLifeDays: 502,
                    avgLifeDays: 344
                  }
                ]
              }
            ]
          },
          {
            productName: "拖拉机械",
            listModel: [
              {
                modelName: "奥龙WD1804A",
                listParts: [
                  {
                    partsName: "发动机",
                    lifeDays: 360,
                    realLifeDays: 363,
                    minLifeDays: 67,
                    maxLifeDays: 532,
                    avgLifeDays: 378
                  },
                  {
                    partsName: "散热器",
                    lifeDays: 180,
                    realLifeDays: 182,
                    minLifeDays: 84,
                    maxLifeDays: 224,
                    avgLifeDays: 182
                  },
                  {
                    partsName: "轮胎",
                    lifeDays: 360,
                    realLifeDays: 376,
                    minLifeDays: 63,
                    maxLifeDays: 434,
                    avgLifeDays: 381
                  }
                ]
              },
              {
                modelName: "奥龙WD1304G",
                listParts: [
                  {
                    partsName: "发动机",
                    lifeDays: 360,
                    realLifeDays: 358,
                    minLifeDays: 87,
                    maxLifeDays: 515,
                    avgLifeDays: 378
                  },
                  {
                    partsName: "散热器",
                    lifeDays: 180,
                    realLifeDays: 199,
                    minLifeDays: 34,
                    maxLifeDays: 276,
                    avgLifeDays: 182
                  },
                  {
                    partsName: "轮胎",
                    lifeDays: 360,
                    realLifeDays: 387,
                    minLifeDays: 57,
                    maxLifeDays: 594,
                    avgLifeDays: 381
                  }
                ]
              },
              {
                modelName: "猛龙WD3100A",
                listParts: [
                  {
                    partsName: "发动机",
                    lifeDays: 360,
                    realLifeDays: 389,
                    minLifeDays: 114,
                    maxLifeDays: 603,
                    avgLifeDays: 378
                  },
                  {
                    partsName: "散热器",
                    lifeDays: 180,
                    realLifeDays: 165,
                    minLifeDays: 43,
                    maxLifeDays: 245,
                    avgLifeDays: 182
                  },
                  {
                    partsName: "轮胎",
                    lifeDays: 360,
                    realLifeDays: 381,
                    minLifeDays: 67,
                    maxLifeDays: 446,
                    avgLifeDays: 381
                  }
                ]
              }
            ]
          },
          {
            productName: "牧草机械",
            listModel: [
              {
                modelName: "9YFG-2200捡拾打捆机",
                listParts: [
                  {
                    partsName: "捡拾器",
                    lifeDays: 360,
                    realLifeDays: 347,
                    minLifeDays: 77,
                    maxLifeDays: 467,
                    avgLifeDays: 354
                  },
                  {
                    partsName: "行走轮",
                    lifeDays: 360,
                    realLifeDays: 359,
                    minLifeDays: 74,
                    maxLifeDays: 559,
                    avgLifeDays: 354
                  },
                  {
                    partsName: "D型小方捆打结器",
                    lifeDays: 180,
                    realLifeDays: 195,
                    minLifeDays: 58,
                    maxLifeDays: 277,
                    avgLifeDays: 191
                  }
                ]
              },
              {
                modelName: "9YGQ-1960捡拾打捆机",
                listParts: [
                  {
                    partsName: "捡拾器",
                    lifeDays: 360,
                    realLifeDays: 346,
                    minLifeDays: 85,
                    maxLifeDays: 451,
                    avgLifeDays: 354
                  },
                  {
                    partsName: "行走轮",
                    lifeDays: 360,
                    realLifeDays: 352,
                    minLifeDays: 66,
                    maxLifeDays: 510,
                    avgLifeDays: 354
                  },
                  {
                    partsName: "D型小方捆打结器",
                    lifeDays: 180,
                    realLifeDays: 188,
                    minLifeDays: 56,
                    maxLifeDays: 332,
                    avgLifeDays: 191
                  }
                ]
              },
              {
                modelName: "9YGQ-1300捡拾打捆机",
                listParts: [
                  {
                    partsName: "捡拾器",
                    lifeDays: 360,
                    realLifeDays: 371,
                    minLifeDays: 74,
                    maxLifeDays: 465,
                    avgLifeDays: 354
                  },
                  {
                    partsName: "行走轮",
                    lifeDays: 360,
                    realLifeDays: 351,
                    minLifeDays: 23,
                    maxLifeDays: 476,
                    avgLifeDays: 354
                  },
                  {
                    partsName: "D型小方捆打结器",
                    lifeDays: 180,
                    realLifeDays: 192,
                    minLifeDays: 21,
                    maxLifeDays: 338,
                    avgLifeDays: 191
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ];
  created() {}
  
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg04.png") no-repeat;
  background-size: 100% 100%;
}
.maincontent {
  width: 90%;
  height: 100vh;
  margin: 0 5%;
}
.left {
  width: 31.5%;
  height: 100vh;
  float: left;
  margin-left: 1%;
}
.leftdiv {
  width: 100%;
  margin-top: 23vh;
}

.middle {
  width: 31.5%;
  height: 100vh;
  float: left;
  margin-left: 2%;
}
.middiv {
  width: 100%;
  margin-top: 23vh;
}
.right {
  width: 31.5%;
  height: 100vh;
  float: left;
  margin-left: 2%;
}
.rightdiv {
  width: 100%;
  margin-top: 23vh;
}
</style>