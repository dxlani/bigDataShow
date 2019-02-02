<template>
    <div id="mapChart"></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
const mapData = require('./map.json');
@Component({})
export default class iotMap extends Vue {
    geoCoordMap:any;
    Mydata:any;

    created() {
        // this.geoCoordMap = {
        //     '江苏连云港':[119.1738722,34.60154897],
        //     '山东济宁':[116.6007976,35.40212166],
        //     '江苏镇江':[119.4558354,32.20440944],
        //     '安徽合肥':[117.2826991,31.86694226],
        //     '广东佛山':[117.2826991,23.03509484],
        //     '天津天津':[117.2108131,39.1439299],
        //     '黑龙江鸡西':[118.87,45.32153989],
        //     '浙江嘉兴':[120.7604277,30.77399224],
        //     '安徽阜阳':[115.8209323,32.90121133],
        //     '安徽六安':[116.5052527,31.75555836],
        //     '辽宁营口':[122.2333914,40.66865107],
        //     '安徽芜湖':[118.3841084,31.36601979],
        //     '江苏苏州':[120.6199071,31.31798737],
        //     '江苏徐州':[117.1881066,34.27155343],
        //     '内蒙古巴彦淖尔':[114.4158675,43.46823822],
        //     '重庆重庆':[106.530635,29.54460611],
        //     '河北廊坊':[116.7036022,39.51861063],
        //     '广东深圳':[114.0259737,22.54605355],
        //     '四川德阳':[102.8991597,30.36748094],
        //     '湖南永州':[111.6146477,26.43597165],
        //     '江苏宿迁':[119.3684889,33.01379717],
        //     '广东广州':[113.3076497,23.1200491],
        //     '江苏泰州':[119.919606,32.47605327],
        //     '江西吉安':[114.9920387,27.11384765],
        //     '江苏常州':[119.981861,31.77139674],
        //     '江苏南通':[120.873801,32.01466454],
        //     '广东珠海':[113.562447,22.25691465],
        //     '湖北咸宁':[114.3000606,29.88065676],
        //     '江苏扬州':[119.4277776,32.40850525],
        //     '湖北襄樊':[112.1495086,32.04926852],
        //     '黑龙江齐齐哈尔':[128.0474137,47.35659164],
        //     '江苏淮安':[119.3132951,33.52834897],
        //     '广东惠州':[114.4106581,23.11353985],
        //     '广东东莞':[113.763434,23.04302382],
        //     '湖北荆州':[112.0998572,30.39610336],
        //     '山东烟台':[121.309555,37.53656156],
        //     '山东临沂':[118.3474451,35.0588778],
        //     '山东青岛':[120.3844282,36.1052149],
        //     '湖北荆门':[112.4105622,31.20931625],
        //     '河北唐山':[118.1834506,39.65053092],
        //     '广东河源':[114.7137215,23.75725085],
        //     '江苏南京':[118.7780744,32.0572355],
        //     '黑龙江大庆':[128.0474137,47.35659164],
        //     '浙江杭州':[120.2193754,30.25924446],
        //     '江西抚州':[116.3609189,27.95454517],
        //     '内蒙古赤峰':[114.4158675,43.46823822],
        //     '安徽蚌埠':[117.3570799,32.92949891],
        //     '天津天津辖县':[117.2108131,39.1439299],
        //     '浙江绍兴':[119.9572024,29.15949412],
        //     '黑龙江哈尔滨':[126.6577169,45.77322463],
        //     '河南郑州':[113.6496438,34.75661006],
        //     '吉林长春':[125.3136424,43.89833761],
        //     '广东中山':[113.42206,22.54517751],
        //     '吉林松原':[126.564544,43.87198833],
        //     '安徽滁州':[118.3245704,32.3173506],
        //     '上海上海':[121.4878995,31.24916171],
        //     '安徽淮南':[117.0186389,32.64281182],
        //     '江苏无锡':[120.3054559,31.57003745],
        //     '黑龙江双鸭山':[131.1714017,46.65510206],
        //     '安徽宿州':[116.9886924,33.63677239],
        //     '河南商丘':[115.6418857,34.43858864],
        //     '福建厦门':[118.103886,24.48923061],
        //     '福建三明':[117.6421939,26.27083528],
        //     '黑龙江佳木斯':[130.2847346,46.8137796],
        //     '江苏盐城':[119.3684889,33.01379717],
        //     '陕西西安':[108.9530983,34.2777999],
        //     '内蒙古包头':[114.4158675,43.46823822],
        //     '湖北武汉':[114.3162001,30.58108413],
        //     '河北邯郸':[114.4826939,36.60930793],
        // };

    }
    mounted () {
      this.drawMap()
    }

    /**
     * 绘制地图
     */
    drawMap(){
        var myChart = echarts.init(document.getElementById("mapChart"));
        window.addEventListener("resize", function () {
            myChart.resize();
        });
        var option = {
            tooltip: {
                padding:0,              
                formatter:function(data){
                    if(data.data.value[2]=="在线"){
                        data.marker = `
                        <div style="
                            padding:3%;
                            width:270px;
                            height:70px;
                            display:flex;
                            border: 1px solid #043B64;
                            background: linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) left top no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) left top no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right top no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) right top no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) left bottom no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) left bottom no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right bottom no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right bottom no-repeat;
                            background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
                            background-color: rgba(12,40,90,0.2);">
                                    <div style="width:25px;height:25px;margin-top:10px;margin-right:5px" >
                                        <img style="width:25px;height:25px;" src="../../../static/device.png">
                                    </div>
                                    <div style="text-align:left;font-size:12px">
                                        <div style="color:#2AEFF1;">所在区域: ${data.data.name}</div>
                                        <div style="color:#2AEFF1;">设备状态：${data.data.value[2]}</div>
                                        <div style="color:#fff;width:100px;text-wrap:normal;">客户单位：${data.data.value[3]}</div>
                                    </div>
                            </div>`
                    }else{
                        data.marker = `
                        <div style="
                            padding:3%;
                            width:270px;
                            height:70px;
                            display:flex;
                            border: 1px solid #043B64;
                            background: linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) left top no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) left top no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right top no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) right top no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) left bottom no-repeat, linear-gradient(to bottom, rgba(15,252,255,1), rgba(15,252,255,1)) left bottom no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right bottom no-repeat, linear-gradient(to left, rgba(15,252,255,1), rgba(15,252,255,1)) right bottom no-repeat;
                            background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
                            background-color: rgba(12,40,90,0.2);">
                                    <div style="width:25px;height:25px;margin-top:10px;margin-right:5px" >
                                        <img style="width:25px;height:25px;" src="../../../static/device1.png">
                                    </div>
                                    <div style="text-align:left;font-size:12px">
                                        <div style="color:#2AEFF1;">所在区域: ${data.data.name}</div>
                                        <div style="color:#fff;">设备状态：${data.data.value[2]}</div>
                                        <div style="color:#fff;width:100px;text-wrap:normal;">客户单位：${data.data.value[3]}</div>
                                    </div>
                            </div>`
                    }   
                    
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
                    color: ['#fff', '#2AEFF1']
                },
                itemWidth:0,
                itemHeight:0,
                hoverLink:false,
                calculable: false
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
                            color: '#ddd'
                        }
                    }
                },
                itemStyle: {
                    normal:{
                        areaColor: '#1A2A6E',
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
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: [],
                symbolSize: 9,
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
                        color: '#2AEFF1',
                    },
                },
                showEffectOn: 'emphasis',
                hoverAnimation: true,
            },
            {  
                type: 'scatter',
                coordinateSystem: 'geo',
                data: [],
                symbolSize: 10,
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
                        color: '#fff',
                    },
                }
            },
           
            ]
        }
        
        mapData.forEach(item=>{
            if(item.status=="在线"){
                option.series[0].data.push({
                    name:item.destcode,
                    value:[
                        item.destlng,
                        item.destlat,
                        item.status,
                        item.clientname,
                    ]});
            }else{
                 option.series[1].data.push({
                    name:item.destcode,
                    value:[
                        item.destlng,
                        item.destlat,
                        item.status,
                        item.clientname,
                    ]});
            }
            
        })
        myChart.setOption(option);
    }


}
</script>

<style lang="scss" scoped>
#mapChart{
  width: 100%;
  min-height: 70vh;
}

</style>