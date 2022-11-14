<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <p class="text-start mb-4 fs-4">{{ dataChartName[dataType] }}</p>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="text-start fs-6">출력 기간</p>
        <div class="col-12">
          <Datepicker class='mb-2' v-model="date" range @update:modelValue="handleDate"/>
        </div>
      </div>
    </div>
    <div class="row g-3 pt-4">
      <div class="col-xl-4 col-lg-6" :key="i" v-for="(series, i) in chartSeries">
        <div class="card">
          <div class="card-body">
            <div class="card-title mt-1 ms-2 mb-0 text-start fs-6">
              {{ chartName[i] }}
            </div>
          </div>
          <VueApexCharts
            :options="chartOptions" :series="chartSeries[i].series"
          ></VueApexCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  data() {
    return {
      date: null,
      selectedIntegerDate: ['', ''],
      monthNum: [0, 0],
      dataType: 0,
      currentTmp: [],
      emptyTmp: [],
      chartName: [],
      chartSeries: [],
      chartOptions: [],
      parkingSeries: [
        {
          series: [
            {
              name: '평균 주차 중',
              data: [1, 2, 3]
            },
            {
              name: '평균 빈 자리',
              data: [4, 5, 6]
            }
          ]
        },
        {
          series: [
            {
              name: '평균 주차 중',
              data: [7, 8, 9]
            },
            {
              name: '평균 빈 자리',
              data: [10, 11, 12]
            }
          ]
        },
        {
          series: [
            {
              name: '평균 주차 중',
              data: [13, 14, 15]
            },
            {
              name: '평균 빈 자리',
              data: [21, 22, 23]
            }
          ]
        },
        {
          series: [
            {
              name: '평균 주차 중',
              data: [31, 32, 33]
            },
            {
              name: '평균 빈 자리',
              data: [34, 41, 42]
            }
          ]
        }
      ]
    }
  },
  computed: {
    selectedDate () {
      return this.$store.getters.getSelectedDate
    },
    dataChartName () {
      return this.$store.getters.getDataChartName
    },
    floorDataList () {
      return this.$store.getters.getFloorDataList
    },
    dataChartArray () {
      return this.$store.getters.getIotDataArray
    }
  },
  created() {
    window.scrollTo(0, 0)
    this.dataType = parseInt(this.$route.query.dataType)
  },
  mounted () {
    if (this.selectedDate[0].length === 0) {
      this.setupDefaultDate(2, 9)
    } else {
      this.date = this.selectedDate
    }
    this.getIntegerDate()
    switch (this.dataType) {
      case 0:
        break
      case 1:
        this.getParkingDataAVGAllTime(this.selectedIntegerDate[0], this.selectedIntegerDate[1])
        this.chartSeries = this.parkingSeries
        this.chartOptions = this.dataChartArray[this.dataType].chartOptions
        break
      case 2:
        break
      case 3:
        break
      case 4:
        break
      case 5:
        break
    }
  },
  methods: {
    async handleDate(modelData) {
      this.date = modelData
      this.$store.commit('selectedDate', this.date)
      this.getIntegerDate()
      switch (this.dataType) {
        case 0:
          break
        case 1:
          this.getParkingDataAVGAllTime(this.selectedIntegerDate[0], this.selectedIntegerDate[1])
          break
        case 2:
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
      }
    },
    async getParkingDataAVGAllTime (start, end) {
      await this.getParkingDataAVGTime('오전(09~12시)', 0, start, end, '........09|........10|........11|........12')
      await this.getParkingDataAVGTime('오후(13~16시)', 1, start, end, '........13|........14|........15|........16')
      await this.getParkingDataAVGTime('저녁(17~19시)', 2, start, end, '........17|........18|........19')
      await this.getParkingDataAVGTime('밤(20~22시)', 3, start, end, '........20|........21|........22')
    },
    async getParkingDataAVGTime (name, index, start, end, time) {
      await this.$apiPost('/api/selectParkingDataAVGTime', { param: [start, end, time] })
        .then((res) => {
          this.chartName[index] = name
          for (const i in res) {
            this.currentTmp.push(res[i].avgCurrent)
            this.emptyTmp.push(res[i].avgEmpty)
          }
          this.parkingSeries[index].series[0].data = this.currentTmp.slice()
          this.parkingSeries[index].series[1].data = this.emptyTmp.slice()
          this.currentTmp = []
          this.emptyTmp = []
        })
    },
    setupDefaultDate (startBeforeDayCount, endBeforeDayCount) {
      const date = new Date()
      const startDate = new Date(new Date().setDate(date.getDate() - endBeforeDayCount))
      const endDate = new Date(new Date().setDate(date.getDate() - startBeforeDayCount))
      this.date = [startDate, endDate]
    },
    getMonthNumber (str) {
      switch (str) {
        case 'Jan':
          return 1
        case 'Feb':
          return 2
        case 'Mar':
          return 3
        case 'Apr':
          return 4
        case 'May':
          return 5
        case 'Jun':
          return 6
        case 'Jul':
          return 7
        case 'Aug':
          return 8
        case 'Sep':
          return 9
        case 'Oct':
          return 10
        case 'Nov':
          return 11
        case 'Dec':
          return 12
      }
    },
    // Calendar 선택 날짜 형식 변환 -> 'yyyymmdd' -> 향후 데이터베이스 대비용
    getIntegerDate () {
      for (let i = 0; i < 2; i++) {
        const splitStr = String(this.date[i]).split(' ')
        this.monthNum[i] = this.getMonthNumber(splitStr[1])
        if (this.monthNum[i] < 10) {
          this.monthNum[i] = '0' + this.monthNum[i]
        }
        const integerDate = String(splitStr[3]) + this.monthNum[i] + String(splitStr[2])
        this.selectedIntegerDate[i] = integerDate + '00'
      }
    }
  },
  components: { VueApexCharts, Datepicker }
}
</script>
