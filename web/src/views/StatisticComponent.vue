<template>
  <div>
    <main>
      <div class="container">
        <div class="row mt-4">
          <div class="col">
            <p class="text-start mb-4 fs-4">마포중앙도서관 대시보드</p>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="text-start fs-6">출력 데이터 기간</p>
            <div class="col col-md-5">
              <Datepicker v-model="date" range @update:modelValue="handleDate"/>
            </div>
          </div>
        </div>
        <div class="row g-3 pt-4">
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 소음(dB)</h5>
              </div>
              <VueApexCharts :options="noiseDataSet.chartOptions" :series="noiseDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">주차장</h5>
              </div>
              <VueApexCharts :options="parkDataSet.chartOptions" :series="parkDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 온도(℃)</h5>
              </div>
              <VueApexCharts :options="tempDataSet.chartOptions" :series="tempDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 습도(%)</h5>
              </div>
              <VueApexCharts :options="humDataSet.chartOptions" :series="humDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 미세먼지(PM10)</h5>
              </div>
              <VueApexCharts :options="PM_10_DataSet.chartOptions" :series="PM_10_DataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 초미세먼지(PM2.5)</h5>
              </div>
              <VueApexCharts :options="PM_2_5_DataSet.chartOptions" :series="PM_2_5_DataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3">샘플 Column 차트</h5>
              </div>
              <ApexColumnBar></ApexColumnBar>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import ApexColumnBar from './../components/ApexColumnBar.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  data () {
    return {
      date: null,
      dataType: '',
      // Area & Line Chart
      noiseDataSet: {
        series: [
          {
            name: '주간 평균 소음',
            type: 'area',
            data: [44, 55, 31, 47, 31, 43, 26]
          },
          {
            name: '설정 기간 평균 소음',
            type: 'line',
            data: [55, 69, 45, 61, 43, 54, 37]
          }
        ],
        chartOptions: {
          chart: {
            type: 'line'
          },
          stroke: {
            curve: 'smooth'
          },
          fill: {
            type: 'solid',
            opacity: [0.35, 1]
          },
          labels: ['B1', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'],
          markers: {
            size: 0
          },
          yaxis: [
            {
              title: {
                text: '소음(DB)'
              },
              min: 0,
              max: 130
            },
            {
              show: false,
              opposite: true,
              title: {
                text: '소음(DB)'
              },
              min: 0,
              max: 130
            }
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== 'undefined') {
                  return y.toFixed(0) + ' dB'
                }
                return y
              }
            }
          }
        }
      },
      // Stacked Bar Chart
      parkDataSet: {
        series: [
          {
            name: '주차 중',
            data: [22, 5, 16]
          },
          {
            name: '주차 가능',
            data: [96, 45, 34]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 10,
              columnWidth: '30%'
            }
          },
          xaxis: {
            categories: ['F1', 'B1', 'B2']
          },
          legend: {
            position: 'top'
          },
          fill: {
            // colors: [function ({ value, seriesIndex, w }) {
            //   if (seriesIndex === 0) {
            //     return '#164666'
            //   } else if (seriesIndex === 1) {
            //     return '#556CFF'
            //   } else {
            //     return '#264333'
            //   }
            // }]
          }
        }
      },
      // Bar Chart
      tempDataSet: {
        series: [
          {
            name: '주간 온도 평균',
            data: [22, 23, 25, 20, 21, 26, 24.5]
          },
          {
            name: '설정 기간 온도 평균',
            data: []
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              columnWidth: '30%'
            }
          },
          xaxis: {
            categories: ['B1', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6']
          },
          legend: {
            position: 'top'
          },
          fill: {
            // colors: [function ({ value, seriesIndex, w }) {
            //   if (seriesIndex === 0) {
            //     return '#111111'
            //   } else if (seriesIndex === 1) {
            //     return '#556CFF'
            //   } else {
            //     return '#264333'
            //   }
            // }]
          }
        }
      },
      // Bar & Line Chart
      humDataSet: {
        series: [
          {
            name: '주간 평균 습도',
            type: 'column',
            data: [55, 40, 30, 77, 60, 32, 43]
          },
          {
            name: '설정 기간 습도 평균',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17]
          }
        ],
        chartOptions: {
          chart: {
            type: 'line'
          },
          stroke: {
            width: [0, 4]
          },
          title: {
            text: '습도(%)'
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              columnWidth: '30%'
            }
          },
          labels: ['B1', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'],
          xaxis: {
            categories: ['B1', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6']
          },
          yaxis: [
            {
              title: {
                text: 'Humidity'
              },
              min: 0,
              max: 100
            },
            {
              opposite: true,
              show: false,
              title: {
                text: 'Humidity'
              },
              min: 0,
              max: 100
            }
          ]
        }
      },
      // Horizon Bar & Goal Point Chart
      PM_10_DataSet: {
        series: [
          {
            name: 'PM10',
            data: [
              {
                x: 'B1',
                y: 30,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F1',
                y: 44,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F2',
                y: 54,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F3',
                y: 66,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F4',
                y: 81,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F5',
                y: 67,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F6',
                y: 70,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              }
            ]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          colors: ['#00E396'],
          dataLabels: {
            formatter: function (val, opt) {
              const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals
              if (goals && goals.length) {
                return `${val}㎍`
              }
              return val
            }
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Actual'],
            markers: {
              fillColors: ['#00E396']
            }
          }
        }
      },
      // Horizon Bar & Goal Point Chart
      PM_2_5_DataSet: {
        series: [
          {
            name: 'PM2.5',
            data: [
              {
                x: 'B1',
                y: 50,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F1',
                y: 33,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F2',
                y: 22,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F3',
                y: 20,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F4',
                y: 17,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F5',
                y: 3,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F6',
                y: 6,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              }
            ]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          colors: ['#00E396'],
          dataLabels: {
            formatter: function (val, opt) {
              const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals
              if (goals && goals.length) {
                return `${val}㎍`
              }
              return val
            }
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Actual'],
            markers: {
              fillColors: ['#00E396']
            }
          }
        }
      }
    }
  },
  created () {
    // 출력 기간 기본값(7일)
    const date = new Date()
    const startDate = new Date(new Date().setDate(date.getDate() - 9))
    const endDate = new Date(new Date().setDate(date.getDate() - 2))
    this.date = [startDate, endDate]
  },
  mounted () {
  },
  methods: {
    handleDate (modelData) {
      this.date = modelData
      console.log(this.date)
      // axios changed data and update chart
      this.updateChart()
    },
    updateChart () {
      this.stackedSeries = this.dataSeries
    }
  },
  name: 'App',
  components: { ApexColumnBar, VueApexCharts, Datepicker }
}
</script>
