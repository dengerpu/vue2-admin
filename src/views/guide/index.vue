<template>
  <div
    ref="bar"
    style="width: 500px; height: 500px; background-color: #071931"
  ></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Guide',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const bar = echarts.init(this.$refs.bar)
      const options = {
        grid: {
          top: '15%',
          bottom: '3%',
          left: '0%',
          right: '0%',
          containLabel: true
        },
        legend: {
          textStyle: {
            color: 'rgba(206,209,216,1)',
            fontSize: 15
          }
        },
        yAxis: {
          type: 'category',
          data: ['第一区域', '第二区域', '第三区域', '第四区域', '第五区域'],
          axisLine: {
            // 坐标轴轴线设置
            show: true, // 显示坐标轴轴线
            lineStyle: {
              // 轴线样式设置
              color: '#fff', // 轴线颜色
              width: 1 // 轴线宽度
              // opacity: 0.8 // 轴线透明度0.8
            }
          },
          axisLabel: {
            fontSize: 15
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            // 坐标轴轴线设置
            show: true, // 显示坐标轴轴线
            lineStyle: {
              // 轴线样式设置
              color: 'red', // 轴线颜色
              width: 2, // 轴线宽度
              opacity: 0.8 // 轴线透明度0.8
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(33,48,69,1)',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            fontSize: 14
          }
        },
        series: [
          {
            name: '第一次测评活动',
            data: [120, 200, 150, 80, 70],
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(68,92,171,1)' },
                { offset: 0.4, color: 'rgba(68,92,171,0.9)' },
                { offset: 0.7, color: 'rgba(68,92,171,0.6)' },
                { offset: 1, color: 'rgba(68,92,171,0.2)' }
              ])
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgba(206,209,216,1)'
              }
            }
          },
          {
            name: '第二次测评活动',
            data: [20, 110, 100, 70, 110],
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(35,86,170,1)' },
                { offset: 0.4, color: 'rgba(35,86,170,0.9)' },
                { offset: 0.7, color: 'rgba(35,86,170,0.6)' },
                { offset: 1, color: 'rgba(35,86,170,0.2)' }
              ])
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgba(206,209,216,1)'
              }
            }
          },
          {
            name: '第三次测评活动',
            data: [50, 170, 110, 67, 99],
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(214,225,89,1)' },
                { offset: 0.4, color: 'rgba(214,225,89,0.9)' },
                { offset: 0.7, color: 'rgba(214,225,89,0.6)' },
                { offset: 1, color: 'rgba(214,225,89,0.2)' }
              ])
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgba(206,209,216,1)'
              }
            }
          }
        ]
      }
      bar.setOption(options, true)
    }
  }
}
</script>

<style lang="scss" scoped></style>
