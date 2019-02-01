<template>
    <div id="companyChart">
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
const random = require('number-random');

@Component({})
export default class companyChart extends Vue {
    companyData=[{"key":"2018-09","value":{"big": "11","small": "356"}},
                {"key": "2018-10","value": {"big": "15","small": "370"}},
                {"key":"2018-11","value":{"big": "15","small": "388"}},
                {"key":"2018-12","value":{"big": "21","small": "392"}},
                {"key":"2019-01","value":{"big": "25","small": "400"}}]
    created(){
        
    }
    mounted() {
        this.drawChart();
    }

    drawChart(){
        var companyChart = echarts.init(document.getElementById('companyChart'));
        window.addEventListener("resize",()=> {
            companyChart.resize();
        });
        var companyM = [];
        this.companyData.forEach((item)=>{
            companyM.push(item.key)
        });
        var companyBig = [];
        this.companyData.forEach((item)=>{
            companyBig.push(item.value.big)
        });
        var companySmall = [];
        this.companyData.forEach((item)=>{
            companySmall.push(item.value.small)
        });
        var myChartOption = {
            grid: {
                y:30,
                left: '2%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            legend: {
                left:0,
                itemWidth: 8,
                itemHeight: 8,
                padding:[15,50],
                itemGap:20,
                textStyle:{
                    color: '#fff',
                    fontSize: 14,
                },
                data: ['大型企业', '中小型企业']
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data:  companyM,
                axisTick:{show:false},
                axisLabel:{
                    textStyle: {
                        color: '#666'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                splitLine:{
                    show:false
                }
            },
            series: [{
                name: '大型企业',
                type: 'bar',
                barGap: 0,
                barWidth: 12,
                itemStyle:{
                    color: '#EB595A',
                },
                data: companyBig,
            },
            {
                name: '中小型企业',
                type: 'bar',
                barWidth: 12,
                itemStyle:{
                    color: '#2AEFF1',
                },
                data: companySmall,
            }]
        }
        companyChart.setOption(myChartOption);
    }
}

</script>
<style lang="scss" scoped>
#companyChart{
  width: 100%;
  height: 250px;
}
</style>