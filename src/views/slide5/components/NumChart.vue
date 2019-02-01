<template>
    <div id="NumChart" style="height:100%;width:100%">
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";
const random = require('number-random');
const numData = require('./Num.json');

@Component({})
export default class NumChart extends Vue {
  
  //  数据量统计
  myChartOption = {
            tooltip: {
                  trigger: 'axis',
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
            //   boundaryGap: false,
              axisLabel:{
                    textStyle: {
                        color: '#666'
                    }
                },
          },
          yAxis: {
              type: 'value',
              name: "单位：TB",
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
              type:'bar',
              barWidth: '20%',
              itemStyle:{
                  color:'#2AEFF1'
              },
          }]
      }
  NumChart:any;
  created(){
     
    var inittime = (new Date().getMonth()+1)+'/'+new Date().getDate();
    var getData = numData.filter(item => {
       return item.key==inittime;
    });
    var index=numData.indexOf(getData[0]);
    for(var i=index-6;i<=index;i++){
       this.myChartOption.xAxis.data.push(numData[i].key);//给X轴 插入时间数据
       this.myChartOption.series[0].data.push(numData[i].value);//给Y轴 插入数据
    }
  }
  mounted() {
    this.drawChart();
     setInterval(()=>{
        var inittime = (new Date().getMonth()+1)+'/'+new Date().getDate();
        var getData = numData.filter(item => {
        return item.key==inittime;
        });
        var index=numData.indexOf(getData[0]);
        var time = new Date();
        if(time.getHours()== 0 && time.getMinutes() == 0 && time.getSeconds() == 0){
        this.myChartOption.xAxis.data.push(numData[index].key);//给X轴 插入时间数据
        this.myChartOption.series[0].data.push(numData[index].value);//给Y轴 插入数据
        // 如果数据超过7个，把第一个数据删除。
        if(this.myChartOption.xAxis.data.length > 7){
           this.myChartOption.xAxis.data.shift()
           this.myChartOption.series[0].data.shift()
        }
        this.NumChart.setOption(this.myChartOption);
        }
      }, 1000);
  }

      drawChart(){
      this.NumChart = echarts.init(document.getElementById('NumChart'));
      window.addEventListener("resize",()=> {
            this.NumChart.resize();
        });
      this.NumChart.setOption(this.myChartOption);
    }

}

</script>