<template>
    <div id="recource">
        <div id="recourceChart">
        </div>
        <div id="recourceNum">
            <div>
                <p>今日资源处理量</p>
                <span>{{todayDate[0].value.TodayData}}TB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>同比<span v-if="todayDate[0].value.TodayPercentage<0">下降</span><span v-if="todayDate[0].value.TodayPercentage>0">上涨</span>：&nbsp;{{TodayPercentage}} 
                    <img   v-if="todayDate[0].value.TodayPercentage>0" src="../../../assets/img/upArrow@2x.png" style="width:6px;height:16px;">
                    <img  v-if="todayDate[0].value.TodayPercentage<0" src="../../../assets/img/downArrow@2x.png" style="width:6px;height:16px;">
                </span>
            </div>
            <div>
                <p>昨日资源处理量</p>
                <span>{{todayDate[0].value.LastdayData}}TB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>同比<span v-if="todayDate[0].value.LastdayPercentage<0">下降</span><span v-if="todayDate[0].value.LastdayPercentage>0">上涨</span>：&nbsp;{{LastdayPercentage}}
                     <img   v-if="todayDate[0].value.LastdayPercentage>0" src="../../../assets/img/upArrow@2x.png" style="width:6px;height:16px;">
                    <img  v-if="todayDate[0].value.LastdayPercentage<0" src="../../../assets/img/downArrow@2x.png" style="width:6px;height:16px;">
                </span>
            </div>
            <div>
                <p>异常任务数</p>
                <span>{{todayDate[0].value.TodayBug}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>同比<span v-if="todayDate[0].value.TodayBugPercentage<0">下降</span><span v-if="todayDate[0].value.TodayBugPercentage>0">上涨</span>：&nbsp;{{TodayBugPercentage}}
                    <img   v-if="todayDate[0].value.TodayBugPercentage>0" src="../../../assets/img/upArrow@2x.png" style="width:6px;height:16px;">
                    <img  v-if="todayDate[0].value.TodayBugPercentage<0" src="../../../assets/img/downArrow@2x.png" style="width:6px;height:16px;">
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
import { setInterval } from "timers";
const random = require('number-random');
const myData = require('./recource.json');

@Component({})
export default class recourceChart extends Vue {
    todayDate=[];
    TodayPercentage:string;
    LastdayPercentage:string;
    TodayBugPercentage:string;
    resourceData=[
        {"clientname":"沃得农机","percentage":"0.387627439"},
        {"clientname":"振光电力","percentage":"0.281177629"},
        {"clientname":"宏信设备","percentage":"0.143689941"},
        {"clientname":"南瑞泰事达","percentage":"0.099928128"},
        {"clientname":"青岛豪迈","percentage":"0.056805175"},
        {"clientname":"常发农机","percentage":"0.030771688"}
    ];
    created(){
        this.todayDate=myData.filter(item=>{
            return item.key==new Date().toLocaleDateString()
        })
        this.TodayPercentage=(this.todayDate[0].value.TodayPercentage*100+'%').replace('-','').replace('+','');
        this.LastdayPercentage=(this.todayDate[0].value.LastdayPercentage*100+'%').replace('-','').replace('+','');
        this.TodayBugPercentage=(this.todayDate[0].value.TodayBugPercentage*100+'%').replace('-','').replace('+','');
    }
    mounted() {
        this.drawChart();
        setInterval(()=>{
            this.todayDate=myData.filter(item=>{
            return item.key==new Date().toLocaleDateString()
            })
            this.TodayPercentage=(this.todayDate[0].value.TodayPercentage*100+'%').replace('-','').replace('+','');
            this.LastdayPercentage=(this.todayDate[0].value.LastdayPercentage*100+'%').replace('-','').replace('+','');
            this.TodayBugPercentage=(this.todayDate[0].value.TodayBugPercentage*100+'%').replace('-','').replace('+','');
        },1000)
    }

    drawChart(){
        var recourceChart = echarts.init(document.getElementById('recourceChart'));
        window.addEventListener("resize",()=> {
            recourceChart.resize();
        });
        var resourceChartData = [];
        this.resourceData.forEach((item)=>{
            resourceChartData.push({
                value: item.percentage,
                name: item.clientname
            })
        });
        var myChartOption = {
            grid: {
                y:20,
                left: '2%',
                right: '1%',
                bottom: '1%',
                containLabel: true
            }, 
            tooltip: {
                show: false
            },
            series: [
                {
                    name:'实时资源占比',
                    type:'pie',
                    center: ['50%', '45%'],
                    radius: ['55%', '80%'],
                    itemStyle: {
                        normal:{
                            color: function (params){
                                var colorList = ['#FF326D','#0DD59F','#05B2E9','#055BE9','#6651FC','#FEC83E','#13E0E9'];
                                return colorList[params.dataIndex];
                            }
                        }
                    },
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter:"{d}%\n\n{b}" ,
                            color:'#fff',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:resourceChartData
                }
            ]
        }
        var Index = -1;
        setInterval( () =>{
            var dataLen = myChartOption.series[0].data.length;
            // 取消之前高亮的图形
            recourceChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: Index
            });
            Index = (Index + 1) % dataLen;
            // 高亮当前图形
            recourceChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: Index
            });
            // 显示 tooltip
            recourceChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: Index
            });
        }, 1000);
        recourceChart.setOption(myChartOption);
    }
}

</script>
<style lang="scss" scoped>
#recource{
  width: 100%;
  height: 250px;
}
#recourceChart{
    width: 48%;
    height: 250px;
    float: left;
}
#recourceNum{
    width: 47%;
    height: 230px;
    float: left;
    text-align: left;
    color: #fff;
    padding-top: 20px;
    padding-left: 5%;
}
#recourceNum p{
    font-size: 16px;
    margin-bottom: 5px;
}
#recourceNum span{
    font-size: 14px;
}
</style>