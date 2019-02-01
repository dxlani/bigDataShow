<template>
    <div id="map"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
@Component({})
export default class iotMap extends Vue {
    geoCoordMap:any;
    Mydata:any;

    created() {

    }
    mounted () {
      this.drawMap()
    }

    /**
     * 绘制地图
     */
    drawMap(){
        var myChart = echarts.init(document.getElementById("map"));
        window.addEventListener("resize", function () {
            myChart.resize();
        });
        this.geoCoordMap = {
            '海门':[121.15,31.89],
            '鄂尔多斯':[109.781327,39.608266],
            '招远':[120.38,37.35],
            '舟山':[122.207216,29.985295],
            '齐齐哈尔':[123.97,47.33],
            '盐城':[120.13,33.38],
            '赤峰':[118.87,42.28],
            '青岛':[120.33,36.07],
            '乳山':[121.52,36.89],
            '金昌':[102.188043,38.520089],
            '泉州':[118.58,24.93],
            '莱西':[120.53,36.86],
            '日照':[119.46,35.42],
            '胶南':[119.97,35.88],
            '南通':[121.05,32.08],
            '拉萨':[91.11,29.97],
            '云浮':[112.02,22.93],
            '梅州':[116.1,24.55],
            '文登':[122.05,37.2],
            '上海':[121.48,31.22],
            '攀枝花':[101.718637,26.582347],
            '威海':[122.1,37.5],
            '承德':[117.93,40.97],
            '厦门':[118.1,24.46],
            '汕尾':[115.375279,22.786211],
            '潮州':[116.63,23.68],
            '丹东':[124.37,40.13],
            '太仓':[121.1,31.45],
            '曲靖':[103.79,25.51],
            '烟台':[121.39,37.52],
            '福州':[119.3,26.08],
            '瓦房店':[121.979603,39.627114],
            '即墨':[120.45,36.38],
            '抚顺':[123.97,41.97],
            '玉溪':[102.52,24.35],
            '张家口':[114.87,40.82],
            '阳泉':[113.57,37.85],
            '莱州':[119.942327,37.177017],
            '湖州':[120.1,30.86],
            '汕头':[116.69,23.39],
            '昆山':[120.95,31.39],
            '宁波':[121.56,29.86],
            '湛江':[110.359377,21.270708],
            '揭阳':[116.35,23.55],
            '荣成':[122.41,37.16],
            '连云港':[119.16,34.59],
            '葫芦岛':[120.836932,40.711052],
            '常熟':[120.74,31.64],
            '东莞':[113.75,23.04],
            '河源':[114.68,23.73],
            '淮安':[119.15,33.5],
            '泰州':[119.9,32.49],
            '南宁':[108.33,22.84],
            '营口':[122.18,40.65],
            '惠州':[114.4,23.09],
            '江阴':[120.26,31.91],
            '蓬莱':[120.75,37.8],
            '韶关':[113.62,24.84],
            '嘉峪关':[98.289152,39.77313],
            '广州':[113.23,23.16],
            '延安':[109.47,36.6],
            '太原':[112.53,37.87],
            '清远':[113.01,23.7],
            '中山':[113.38,22.52],
            '昆明':[102.73,25.04],
            '寿光':[118.73,36.86],
            '盘锦':[122.070714,41.119997],
            '长治':[113.08,36.18],
            '深圳':[114.07,22.62],
            '珠海':[113.52,22.3],
            '宿迁':[118.3,33.96],
            '咸阳':[108.72,34.36],
            '铜川':[109.11,35.09],
            '平度':[119.97,36.77],
            '佛山':[113.11,23.05],
            '海口':[110.35,20.02],
            '江门':[113.06,22.61],
            '章丘':[117.53,36.72],
            '肇庆':[112.44,23.05],
            '大连':[121.62,38.92],
            '临汾':[111.5,36.08],
            '吴江':[120.63,31.16],
            '石嘴山':[106.39,39.04],
            '沈阳':[123.38,41.8],
            '苏州':[120.62,31.32],
            '茂名':[110.88,21.68],
            '嘉兴':[120.76,30.77],
            '长春':[125.35,43.88],
            '胶州':[120.03336,36.264622],
            '银川':[106.27,38.47],
            '张家港':[120.555821,31.875428],
            '三门峡':[111.19,34.76],
            '锦州':[121.15,41.13],
            '南昌':[115.89,28.68],
            '柳州':[109.4,24.33],
            '三亚':[109.511909,18.252847],
            '自贡':[104.778442,29.33903],
            '吉林':[126.57,43.87],
            '阳江':[111.95,21.85],
            '泸州':[105.39,28.91],
            '西宁':[101.74,36.56],
            '宜宾':[104.56,29.77],
            '呼和浩特':[111.65,40.82],
            '成都':[104.06,30.67],
            '大同':[113.3,40.12],
            '镇江':[119.44,32.2],
            '桂林':[110.28,25.29],
            '张家界':[110.479191,29.117096],
            '宜兴':[119.82,31.36],
            '北海':[109.12,21.49],
            '西安':[108.95,34.27],
            '金坛':[119.56,31.74],
            '东营':[118.49,37.46],
            '牡丹江':[129.58,44.6],
            '遵义':[106.9,27.7],
            '绍兴':[120.58,30.01],
            '扬州':[119.42,32.39],
            '常州':[119.95,31.79],
            '潍坊':[119.1,36.62],
            '重庆':[106.54,29.59],
            '台州':[121.420757,28.656386],
            '南京':[118.78,32.04],
            '滨州':[118.03,37.36],
            '贵阳':[106.71,26.57],
            '无锡':[120.29,31.59],
            '本溪':[123.73,41.3],
            '克拉玛依':[84.77,45.59],
            '渭南':[109.5,34.52],
            '马鞍山':[118.48,31.56],
            '宝鸡':[107.15,34.38],
            '焦作':[113.21,35.24],
            '句容':[119.16,31.95],
            '北京':[116.46,39.92],
            '徐州':[117.2,34.26],
            '衡水':[115.72,37.72],
            '包头':[110,40.58],
            '绵阳':[104.73,31.48],
            '乌鲁木齐':[87.68,43.77],
            '枣庄':[117.57,34.86],
            '杭州':[120.19,30.26],
            '淄博':[118.05,36.78],
            '鞍山':[122.85,41.12],
            '溧阳':[119.48,31.43],
            '库尔勒':[86.06,41.68],
            '安阳':[114.35,36.1],
            '开封':[114.35,34.79],
            '济南':[117,36.65],
            '德阳':[104.37,31.13],
            '温州':[120.65,28.01],
            '九江':[115.97,29.71],
            '邯郸':[114.47,36.6],
            '临安':[119.72,30.23],
            '兰州':[103.73,36.03],
            '沧州':[116.83,38.33],
            '临沂':[118.35,35.05],
            '南充':[106.110698,30.837793],
            '天津':[117.2,39.13],
            '富阳':[119.95,30.07],
            '泰安':[117.13,36.18],
            '诸暨':[120.23,29.71],
            '郑州':[113.65,34.76],
            '哈尔滨':[126.63,45.75],
            '聊城':[115.97,36.45],
            '芜湖':[118.38,31.33],
            '唐山':[118.02,39.63],
            '平顶山':[113.29,33.75],
            '邢台':[114.48,37.05],
            '德州':[116.29,37.45],
            '济宁':[116.59,35.38],
            '荆州':[112.239741,30.335165],
            '宜昌':[111.3,30.7],
            '义乌':[120.06,29.32],
            '丽水':[119.92,28.45],
            '洛阳':[112.44,34.7],
            '秦皇岛':[119.57,39.95],
            '株洲':[113.16,27.83],
            '石家庄':[114.48,38.03],
            '莱芜':[117.67,36.19],
            '常德':[111.69,29.05],
            '保定':[115.48,38.85],
            '湘潭':[112.91,27.87],
            '金华':[119.64,29.12],
            '岳阳':[113.09,29.37],
            '长沙':[113,28.21],
            '衢州':[118.88,28.97],
            '廊坊':[116.7,39.53],
            '菏泽':[115.480656,35.23375],
            '合肥':[117.27,31.86],
            '武汉':[114.31,30.52],
            '大庆':[125.03,46.58]
        };
        this.Mydata = [
            {
                "provinceVehiclesList": [
                  {
          "province": "江苏",
          "nodeSum": 470,
          "deviceSum": 29922,
          "deviceonlinepercent": 0.9736
        },
        {
          "province": "安徽",
          "nodeSum": 358,
          "deviceSum": 22748,
          "deviceonlinepercent": 0.9467
        },
        {
          "province": "河北",
          "nodeSum": 343,
          "deviceSum": 21791,
          "deviceonlinepercent": 0.9323
        },
        {
          "province": "山东",
          "nodeSum": 253,
          "deviceSum": 16083,
          "deviceonlinepercent": 0.8933
        },
        {
          "province": "河南",
          "nodeSum": 189,
          "deviceSum": 12037,
          "deviceonlinepercent": 0.98
        },
        {
          "province": "辽宁",
          "nodeSum": 112,
          "deviceSum": 7096,
          "deviceonlinepercent": 0.9118
        },
        {
          "province": "黑龙江",
          "nodeSum": 62,
          "deviceSum": 3920,
          "deviceonlinepercent": 0.9838
        },
        {
          "province": "上海",
          "nodeSum": 48,
          "deviceSum": 3053,
          "deviceonlinepercent": 0.9505
        },
        {
          "province": "山西",
          "nodeSum": 44,
          "deviceSum": 2804,
          "deviceonlinepercent": 0.8933
        },
        {
          "province": "江西",
          "nodeSum": 33,
          "deviceSum": 2076,
          "deviceonlinepercent": 0.9275
        },
        {
          "province": "福建",
          "nodeSum": 29,
          "deviceSum": 1866,
          "deviceonlinepercent": 0.9183
        },
        {
          "province": "吉林",
          "nodeSum": 28,
          "deviceSum": 1779,
          "deviceonlinepercent": 0.8583
        },
        {
          "province": "浙江",
          "nodeSum": 23,
          "deviceSum": 1473,
          "deviceonlinepercent": 0.9592
        },
        {
          "province": "湖北",
          "nodeSum": 13,
          "deviceSum": 847,
          "deviceonlinepercent": 0.8742
        },
        {
          "province": "广东",
          "nodeSum": 13,
          "deviceSum": 835,
          "deviceonlinepercent": 0.9582
        },
        {
          "province": "宁夏",
          "nodeSum": 10,
          "deviceSum": 643,
          "deviceonlinepercent": 0.8557
        },
        {
          "province": "天津",
          "nodeSum": 9,
          "deviceSum": 549,
          "deviceonlinepercent": 0.9896
        },
        {
          "province": "内蒙古",
          "nodeSum": 8,
          "deviceSum": 504,
          "deviceonlinepercent": 0.9834
        },
        {
          "province": "重庆",
          "nodeSum": 7,
          "deviceSum": 418,
          "deviceonlinepercent": 0.9742
        },
        {
          "province": "广西",
          "nodeSum": 6,
          "deviceSum": 393,
          "deviceonlinepercent": 0.9818
        },
        {
          "province": "云南",
          "nodeSum": 6,
          "deviceSum": 392,
          "deviceonlinepercent": 0.8824
        },
        {
          "province": "陕西",
          "nodeSum": 6,
          "deviceSum": 370,
          "deviceonlinepercent": 0.9234
        },
        {
          "province": "四川",
          "nodeSum": 5,
          "deviceSum": 316,
          "deviceonlinepercent": 0.9047
        },
        {
          "province": "北京",
          "nodeSum": 4,
          "deviceSum": 251,
          "deviceonlinepercent": 0.9651
        },
        {
          "province": "湖南",
          "nodeSum": 3,
          "deviceSum": 184,
          "deviceonlinepercent": 0.9236
        },
        {
          "province": "甘肃",
          "nodeSum": 3,
          "deviceSum": 169,
          "deviceonlinepercent": 0.9345
        },
        {
          "province": "贵州",
          "nodeSum": 1,
          "deviceSum": 59,
          "deviceonlinepercent": 0.8521
        },
        {
          "province": "新疆",
          "nodeSum": 1,
          "deviceSum": 55,
          "deviceonlinepercent": 0.9523
        },
        {
          "province": "青海",
          "nodeSum": 0,
          "deviceSum": 0,
          "deviceonlinepercent": 0
        },
        {
          "province": "西藏",
          "nodeSum": 0,
          "deviceSum": 0,
          "deviceonlinepercent": 0
        },
        {
          "province": "台湾",
          "nodeSum": 0,
          "deviceSum": 0,
          "deviceonlinepercent": 0
        },
        {
          "province": "海南",
          "nodeSum": 0,
          "deviceSum": 0,
          "deviceonlinepercent": 0
        },
         {
          "province": "南海诸岛",
          "nodeSum": 0,
          "deviceSum": 0,
          "deviceonlinepercent": 0
        },
        {
          "province": "香港",
          "nodeSum": 0,
          "deviceSum": 0,
          "deviceonlinepercent": 0
        },

                    ],

            }
        ]
        var option = {
            tooltip: {
                padding:0,
                formatter:function(data){
                  // console.log(data)
                    data.marker = `
                        <div style="
                            padding:2%;
                            width:250px;
                            height:90px;
                            position:relative;
                            border: 1px solid #043B64;
                            background: linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) left top no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) left top no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right top no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) right top no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) left bottom no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) left bottom no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right bottom no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right bottom no-repeat;
                            background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
                            background-color: rgba(12,40,90,0.2);">
                                <div style="
                                    display:flex;
                                    justify-content:flex-start;
                                    align-item:center;
                                    position:absolute;
                                    font-size:14px;
                                    left:20px;
                                    padding-top:3%">
                                    <div style="width:40px;height:40px;margin-right:15px;">
                                        <img style="width:100%;height:100%;" src="../../../static/device.png">
                                    </div>
                                    <div>
                                        <div style="color:#2AEFF1;"> 所在省份: ${data.data.name}</div>
                                        <div style="color:#2AEFF1;"> 节点总数：${data.data.value?data.data.value:'0'}</div>
                                        <div style="color:#fff;">设备总数：${data.data.deviceSum}</div>
                                         <div style="color:#fff;">设备总数：${ parseFloat(((data.data.deviceonlinepercent)*100).toString()).toFixed(2)}%</div>
                                    </div>
                                </div>
                            </div>`
                    return data.marker
                }
            },
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                seriesIndex: [1],
                inRange: {
                    color: ['#1A2A6E', '#1A2A6E']
                },
                itemWidth:0,
                itemHeight:0,
                hoverLink:false,
                calculable : false
            },
            geo: {
                show:true,
                map: 'china',
                roam: false,
                zoom:1.2,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal:{
                        areaColor: '#00167b',
                        borderWidth: 1,
                        borderColor: '#03449A',
                    },
                    emphasis:{
                        areaColor: '#0055ed',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            },
            series : [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData([]),
                symbolSize: 20,
                symbolRotate: 35,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'top',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F06C00'
                    },
                }
            },
            {
                name: '当前位于',
                type: 'map',
                geoIndex: 0,
                data:[]
            }
            ]
        }

        this.Mydata[0].provinceVehiclesList.forEach(element=>{
            option.series[1].data.push({name:element.province,value:element.nodeSum,
            deviceSum: element.deviceSum,
          deviceonlinepercent: element.deviceonlinepercent
            });
        })
        myChart.setOption(option);
    }
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }

}
</script>

<style lang="scss" scoped>
#map{
  width: 100%;
        min-height: 55vh;
}
</style>
