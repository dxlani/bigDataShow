<template>
    <div style="position:relative;width:100%;height:100%">
      <div class="chart-title" style="">
          <span class="big-tit">任务总数/成功率</span> {{nowData.lastcount}} <span class="small-txt">个</span> / {{nowData.lastRate}} <span class="small-txt">%</span>
      </div>
    <div id="taskChart" style="width:100%; height:100%">
   </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
const random = require('number-random');

@Component({})
export default class taskChart extends Vue {


  nowData = {};
  //  任务
optionFf = {
  tooltip: {
        trigger: 'axis',
      backgroundColor: 'rgba(26,42,110,0.6)'
    },
    xAxis: {
        type: 'category',
        data: [],
        axisTick:{
            show:false
        },
        axisLine:{
            lineStyle:{
                color:'#666',
            },
        },
        axisLabel: {
            show: true,
            textStyle: {
              fontSize:'14'
            }
        },
         boundaryGap: false,
    },
    // yAxis: {
    //     // type: 'value',
    //     show:false
    // },
    yAxis: [
				        {
				            type : 'value',
                    name : '任务总数',
                    show:false

				        },
				        {
				            type : 'value',
                    name: '成功率',
                    show:false

				        }
				    ],
    series: [{
        name: '任务总数',
        showAllSymbol: true,
        showSymbol: false,
        data: [],
        type: 'line',
        smooth: true,
         yAxisIndex: 0,
        itemStyle:{
          color:'#F9AB41'
      },
    },
    {
        name: '成功率',
        showAllSymbol: true,
        showSymbol: false,
        data: [],
        type: 'line',
        smooth: true,
         yAxisIndex: 1,
        itemStyle:{
          color:'#00FFFD'
      },
    }]
}
  taskChart:any;
  created(){

    for(var i=0;i<7;i++){
    var inittime = new Date(new Date().getTime()-60000*(6-i));
    var minute=inittime.getMinutes()<10?('0'+inittime.getMinutes()):inittime.getMinutes();
    this.optionFf.xAxis.data.push(inittime.getHours()+':'+minute);//给X轴 插入时间数据
    this.optionFf.series[0].data.push(random(4000,6000));//给Y轴 插入温度数据
    this.optionFf.series[1].data.push(random(90,100));
    }
    this.nowData = {
      lastcount: this.optionFf.series[0].data[6],
      lastRate: this.optionFf.series[1].data[6]
    }

  }
  mounted() {
    this.drawChart();
     setInterval(()=>{
        var time = new Date();
        if(time.getSeconds()== 0){
        var minute=time.getMinutes()<10?('0'+time.getMinutes().toString()):time.getMinutes().toString();
        this.optionFf.xAxis.data.push(time.getHours()+':'+minute);//给X轴 插入时间数据
        this.optionFf.series[0].data.push(random(4000,6000));//给Y轴
        this.optionFf.series[1].data.push(random(90,100));
        // 如果数据超过7个，把第一个数据删除。
        if(this.optionFf.xAxis.data.length > 7){
           this.optionFf.xAxis.data.shift()
           this.optionFf.series[0].data.shift()
            this.optionFf.series[1].data.shift()
        }
        this.$set(this.nowData,"lastcount",this.optionFf.series[0].data[6])
        this.$set(this.nowData,"lastRate",this.optionFf.series[1].data[6])
        this.taskChart.setOption(this.optionFf);
        }
      }, 1000);
  }

      drawChart(){

      this.taskChart = echarts.init(document.getElementById('taskChart'));

      this.taskChart.setOption(this.optionFf);
      window.addEventListener("resize",()=> {
            this.taskChart.resize();
        });
    }

}

</script>

<style scope>
.chart-title{
width:100%; position:absolute;left:0;top:0;z-index:999;
font-size: 20px;
color:#2AEFF1;
}
.big-tit {
  display: inline-block;
  margin-right: 40px;
}
.small-txt {
  font-size: 14px;
}
</style>
