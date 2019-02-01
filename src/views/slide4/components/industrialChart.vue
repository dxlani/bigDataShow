<template>
   <div id="industrialDistributionChart"  style="height:100%">
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as echarts from "echarts";

@Component({})
export default class industrialChart extends Vue {

  public  myChart: any;
provinceVehiclesData:any ;
currentIndex:number;
  /**行业分布 */
  option = {
    title: {
      text: `{a|行业分布}`,
                    x:'center',
                    y:'1%',
                    textStyle:{
                      rich:{
                        a:{
                          fontSize: 16,
                               color:'#fff',
                               align:'center',
                               textAlign: 'center',
                               margin:30
                            },

                        }
                    },
    },
    tooltip: {

        show: false
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:[]
    },
    series: [
        {
            name:'行业分布',
            type:'pie',
            radius: ['50%', '70%'],
            itemStyle: {
                normal:{
                    color: function (params){
                        var colorList = ['#05B2E9','#055BE9','#6651FC','#FEC83E','#FF326D','#0DD59F','#13E0E9'];
                        return colorList[params.dataIndex];
                    }
                }
            },
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                     position: 'center',
                      //  trigger: 'item',
                        formatter:"{d}% \r\n\r\n {b}" ,
                      color:'#fff',
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[

            ]
        }
    ]
}

  created(){
    this.currentIndex = -1;

  }
  mounted() {

  }

initechart(data) {
    this.provinceVehiclesData = data;

    var industrialDistributionChart = document.getElementById("industrialDistributionChart");
    this.provinceVehiclesData.forEach(element=>{
      this.option.series[0].data.push({
              value: element.value,
              name: element.name,
          });
    })
    this.myChart = echarts.init(industrialDistributionChart);
    window.addEventListener("resize",()=> {
            this.myChart.resize();
        });
    this.myChart.setOption(this.option);
     setInterval(() => {
        var dataLen = this.option.series[0].data.length;
        // 取消之前高亮的图形
        this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
        this.currentIndex = (this.currentIndex + 1) % dataLen;
        // 高亮当前图形
        this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
        // 显示 tooltip
        this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
    }, 1000);
  }

}

</script>

<style scope>
.chart-title{
width:100%; position:absolute;left:0;top:0;z-index:999;
font-size: 16px;
color:#2AEFF1;

}
</style>
