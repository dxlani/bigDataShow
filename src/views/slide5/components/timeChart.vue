<template>
    <div id="time">
        <div id="timePart1">
            <p>接入时长分布</p>
            <p class="fontW">1个月以下</p>
            <p class="fontW">1-3个月</p>
            <p class="fontW">4-6个月</p>
            <p class="fontW">7-9个月</p>
            <p class="fontW">10-12个月</p>
            <p class="fontW">1年以上</p>
        </div>
        <div id="timePart2">
            <p>企业数</p>
            <p class="fontW">8</p>
            <p class="fontW">26</p>
            <p class="fontW">58</p>
            <p class="fontW">47</p>
            <p class="fontW">54</p>
            <p class="fontW">237</p>
        </div>
        <div id="timePart3">
            <p>占比</p>
            <div id="timeChart"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";

@Component({})
export default class timeChart extends Vue {
    timeData=[
        {"type": "一个月以下","count": "8","percentage": "0.018604651"},
        {"type": "1-3个月","count": "26","percentage": "0.0604651162790698"},
        {"type": "4-6个月","count": "58","percentage": "0.134883720930233"},
        {"type": "7-9个月","count": "47","percentage": "0.109302325581395"},
        {"type": "10-12个月","count": "54","percentage": "0.125581395348837"},
        {"type": "1年以上","count": "237","percentage": "0.551162790697674"}
    ]
    created(){
        
    }
    mounted() {
        this.drawChart();
    }

    drawChart(){
        var timeChart = echarts.init(document.getElementById('timeChart'));
        window.addEventListener("resize",()=> {
            timeChart.resize();
        });
        var timeChartData = [];
        this.timeData.forEach((item)=>{
            timeChartData.push(item.percentage)
        });
        timeChartData = timeChartData.reverse()

        var myChartOption = {
            tooltip: {
                show:false
            },
            grid: {
                y:-10,
                left: '1%',
                right: '50',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                splitLine: {show: false},
                axisLabel: {show: false},
                axisTick: {show: false},
                axisLine: {show: false}
            },
            yAxis: {
                type: 'category',
                data: [],
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {
                    margin: 30,
                    textStyle: {
                        fontSize: 14
                    }
                },
            },
            series: [
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#333'
                        }
                    },
                    silent: true,
                    barWidth: 12,
                    barGap: '-100%',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function(param) {
                            return  (Number(timeChartData[param.dataIndex])*100).toFixed(2) +'%';
                        },
                        textStyle:{
                            color: '#fff',
                            fontSize:'12'
                        },
                    },
                    data: [1, 1, 1, 1, 1, 1],
                },
                {
                    type: 'bar',
                    data: timeChartData,
                    barWidth:12,
                    barCategoryGap:20,
                    itemStyle: {
                        normal:{
                            color: function (params){
                                var colorList = ['#02C093','#02C093','#FDB609','#FDB609','#EB595A','#EB595A'];
                                return colorList[params.dataIndex];
                            },
                        }
                    },
                }
            ],
        }
        timeChart.setOption(myChartOption);
    }
}

</script>
<style lang="scss" scoped>
#time{
    width: 100%;
    height: 250px;
}
#timePart1, #timePart2{
   width: 23%;
//    height: 100%;
   text-align: left;
   float: left;
   padding: 5px 8px;
}
#timePart3{
    width: 38%;
    text-align: left;
    float: left;
    padding: 5px;
}

.fontW{
    color: #fff;
    line-height: 18px;
}
#timeChart{
    width: 100%;
    height: 190px;
}
</style>
