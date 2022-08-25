<template>
<div>
  <VueApexCharts :type="type" :options="chartOptions" :series="series"></VueApexCharts>
</div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'BarChart',
  components: { VueApexCharts },
  props: {
    type: String
  },
  data () {
    return {
      series: [
        {
          name: '일 평균',
          data: [44, 55, 57]
        },
        {
          name: '주간 평균',
          data: [76, 85, 101]
        },
        {
          name: '월간 평균',
          data: [35, 41, 36]
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 400
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['소음(db)', '미세먼지(㎍)', '이용객(명)']
        },
        yaxis: {
          title: {
            text: 'units'
          }
        },
        legend: {
          position: 'top'
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '@ ' + val + ' units'
            }
          }
        }
      }
    }
  }
}
</script>
