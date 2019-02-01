<template>
    <div id="nodeChart" style="height:100%;width:100%">
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
const random = require('number-random');

@Component({})
export default class nodeChart extends Vue {
  
  // 节点异常
  myChartOption = {
            tooltip: {
                    show:false
                },
           grid: {
                y:50,
                left: '2%',
                right: '25px',
                bottom: '15%',
                containLabel: true
            },
          xAxis: {
              type: 'category',
              data:  [],
              axisTick:{show:false},
              boundaryGap: false,
              axisLabel:{
                    textStyle: {
                        color: '#666'
                    }
                },
          },
          yAxis: {
              type: 'value',
              name: "单位：个",
              nameTextStyle: {
              padding: [0, 0, 10, 10],
              color:'#666'
                },
              axisTick:{show:false},
              axisLine:{show:false},
              axisLabel:{
                    textStyle: {
                        color: '#666'
                    }
                },
                splitLine:{
                  lineStyle:{
                     color:'#666'
                   }
                }
          },
          series: [{
              data: [],
              type: 'line',
              symbolSize: 8,
              color: ['#00FFFD'],
              symbol: 'circle',
              itemStyle:{
                normal:{
                  color:'#000204',
                  borderColor:'#FEED4F',
                  borderWidth: 2,
                  borderType: 'solid',
                }
              },
              lineStyle:{
                color: '#FEED4F',
                width: 2,
                type: 'solid',
              },
          }]
      }
  nodeChart:any;
  created(){
    for(var i=0;i<7;i++){
    var inittime = new Date(new Date().getTime()-60000*(6-i));
    var minute=inittime.getMinutes()<10?('0'+inittime.getMinutes().toString()):inittime.getMinutes().toString();
    this.myChartOption.xAxis.data.push(inittime.getHours()+':'+minute);//给X轴 插入时间数据
    this.myChartOption.series[0].data.push(random(5,15));//给Y轴 插入数据
    }
    
  }
  mounted() {
    this.drawChart();
    var nodeTimer=setInterval(()=>{
        var time = new Date();
        // console.log('bbbb',new Date(),new Date().getSeconds());
        if(time.getSeconds()== 0){
        var minute=time.getMinutes()<10?('0'+time.getMinutes().toString()):time.getMinutes().toString();
        this.myChartOption.xAxis.data.push(time.getHours()+':'+minute);//给X轴 插入时间数据
        this.myChartOption.series[0].data.push(random(5,15));//给Y轴 插入数据
        // 如果数据超过7个，把第一个数据删除。
        if(this.myChartOption.xAxis.data.length > 7){
           this.myChartOption.xAxis.data.shift()
           this.myChartOption.series[0].data.shift()
        }
        this.nodeChart.setOption(this.myChartOption);
        }
      }, 1000);
  }

      drawChart(){
      this.nodeChart = echarts.init(document.getElementById('nodeChart'));
      window.addEventListener("resize",()=> {
            this.nodeChart.resize();
        });
      this.nodeChart.setOption(this.myChartOption);
    }

}

</script>