<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" class="btn">echarts官网</a>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import echarts from 'echarts'
import baseOptions from '../../assets/js/e-option-lib.js'
import commonjs from '../../assets/js/commonjs.y.js'
export default {
  data () {
    return {
      echartsBox: {
        myChartLine: null,
        myChartBar: null
      },
      echartsOption: {
        optionBar: null,
        optionLine: null
      }
    }
  },
  methods: {
    drawBarChart () {
      this.echartsBox.myChartBar = echarts.init(document.getElementById('chartBar'))
      this.echartsBox.myChartBar.clear()
      let xAxisDataBar = []
      for (let i = 1; i < 32; i++) {
        xAxisDataBar.push(i)
      }
      let xAxisBar = baseOptions.axis.xAxis('category', 10, 12, xAxisDataBar, true)
      let yAxisBar = baseOptions.axis.yAxis('kW', 3)
      let legendBar = baseOptions.legend(20)
      let gridBar = baseOptions.grid(35, 10, 20, 40)
      this.echartsOption.optionBar = {
        legend: legendBar,
        grid: gridBar,
        xAxis: xAxisBar,
        yAxis: yAxisBar,
        series: []
      }
      let seriesBar = baseOptions.series.bar('本月用电量', 12, 0, '0, 155, 235', true)
      let seriesBar2 = baseOptions.series.bar('上月用电量', 12, 0, '255, 125, 135', true)
      for (let i = 0; i < 31; i++) {
        seriesBar.data.push(Math.random() * 100)
        seriesBar2.data.push(Math.random() * 100)
      }
      this.echartsOption.optionBar.series.push(seriesBar)
      this.echartsOption.optionBar.series.push(seriesBar2)
      this.echartsBox.myChartBar.setOption(this.echartsOption.optionBar)
    },
    drawLineChart () {
      this.echartsBox.myChartLine = echarts.init(document.getElementById('chartLine'))
      this.echartsBox.myChartLine.clear()
      let xAxisData = commonjs.splitDate()
      let xAxis = baseOptions.axis.xAxis('category', 10, 12, xAxisData, false)
      let yAxis = baseOptions.axis.yAxis('kW', 5)
      let legend = baseOptions.legend(20)
      let grid = baseOptions.grid(35, 10, 20, 40)
      this.echartsOption.optionLine = {
        legend: legend,
        grid: grid,
        xAxis: xAxis,
        yAxis: yAxis,
        series: []
      }
      let series1 = baseOptions.series.line('今日负荷', 5, true, 1, '50, 222, 180', true, false)
      let series2 = baseOptions.series.line('昨日负荷', 5, true, 1, '250, 210, 25', true, false)
      for (let i = 0; i < 12; i++) {
        series1.data.push(Math.random() * 100)
        series2.data.push(Math.random() * 100)
      }
      this.echartsOption.optionLine.series.push(series1)
      this.echartsOption.optionLine.series.push(series2)
      this.echartsBox.myChartLine.setOption(this.echartsOption.optionLine)
    },
    drawCharts () {
      this.drawBarChart()
      this.drawLineChart()
    }
  },
  mounted: function () {
    this.drawCharts()
    // 窗口变化事件挂载到mounted
    window.onresize = () => {
      this.echartsBox.myChartLine.resize()
      this.echartsBox.myChartBar.resize()
    }
  },
  updated: function () {
    this.drawCharts()
  }
}
</script>

<style scoped>
.chart-container {
    width: 100%;
    float: left;
}
.el-col {
    padding: 30px 20px;
}
.btn {
  display: block;
  widows: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #409eff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
</style>
