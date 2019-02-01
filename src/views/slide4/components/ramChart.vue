<template>
<div style="position:relative;width:100%;height:100%">
      <div class="chart-title" style="">
         <span class="big-tit">内存总数/利用率</span> {{nowData.lastCount}} <span class="small-txt">TB</span> / {{nowData.lastRate}} <span class="small-txt">%</span>
      </div>
    <div id="ramChart" style="width:100%; height:100%">
   </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import * as echarts from "echarts";
const random = require('number-random');

@Component({})
export default class ramChart extends Vue {

lastcount:any;

  nowData = {};
  //  内存

  optionF = {
  tooltip: {
        trigger: 'axis',
      backgroundColor: 'rgba(26,42,110,0.6)',
    },
    xAxis: {
        type: 'category',
        data: [],
        axisTick:{
            show:false
        },
        axisLine:{
            lineStyle:{
                color:'#666'
            }
        },
         axisLabel: {
            show: true,
            textStyle: {
              fontSize:'14'
            }
        },
        boundaryGap: false,
    },
    yAxis: [
        {
            type : 'value',
            name : '内存总数',
            show:false

        },
        {
            type : 'value',
            name: '利用率',
            show:false

        }
    ],
    series: [{
        name: '内存总数',
        showAllSymbol: true,
        showSymbol: false,
        data: [],
        type: 'line',
        smooth: true,
         yAxisIndex: 0,
         itemStyle:{
                    color: '#F9AB41',
                },

    },
    {
        name: '利用率',
        showAllSymbol: true,
        showSymbol: false,
        data: [],
        type: 'line',
        smooth: true,
         yAxisIndex: 1,
         itemStyle:{
                    color: '#00FFFD',
                },

    }]
}
  ramChart:any;

  created(){
    for(var i=0;i<7;i++){
    var inittime = new Date(new Date().getTime()-60000*(6-i));
    var minute=inittime.getMinutes()<10?('0'+inittime.getMinutes()):inittime.getMinutes();
    this.optionF.xAxis.data.push(inittime.getHours()+':'+minute);//给X轴 插入时间数据
    this.optionF.series[0].data.push(random(24,36));//给Y轴 插入温度数据
    this.optionF.series[1].data.push(random(60,80));
    }
    this.nowData = {
      lastCount: this.optionF.series[0].data[6],
      lastRate: this.optionF.series[1].data[6]
    }
    // this.lastcount = this.optionF.series[0].data[6];
    // this.lastRate = this.optionF.series[1].data[6];

  }
  mounted() {
    this.drawChart();
     setInterval(()=>{
        var time = new Date();
        if(time.getSeconds()== 0){
        var minute=time.getMinutes()<10?('0'+time.getMinutes().toString()):time.getMinutes().toString();
        this.optionF.xAxis.data.push(time.getHours()+':'+minute);//给X轴 插入时间数据
        this.optionF.series[0].data.push(random(24,36));//给Y轴
        this.optionF.series[1].data.push(random(60,80));
        // 如果数据超过7个，把第一个数据删除。
        if(this.optionF.xAxis.data.length > 7){
           this.optionF.xAxis.data.shift()
           this.optionF.series[0].data.shift()
            this.optionF.series[1].data.shift()
        }
          this.$set(this.nowData,"lastCount",this.optionF.series[0].data[6])
          this.$set(this.nowData,"lastRate",this.optionF.series[1].data[6])
        this.ramChart.setOption(this.optionF);
        }
      }, 1000);
  }

      drawChart(){
        this.ramChart = echarts.init(document.getElementById('ramChart'));

      this.ramChart.setOption(this.optionF);
       window.addEventListener("resize",()=> {
            this.ramChart.resize();
        });
    }

}

</script>

<style scope>
.chart-title{
width:100%; position:absolute;left:0;top:0;z-index:999;
font-size: 20px;
color:#2AEFF1;
padding-left: 40px;
padding-top: 10px;
}
.big-tit {
  display: inline-block;
  margin-right: 40px;
}
.small-txt {
  font-size: 14px;
}
</style>
