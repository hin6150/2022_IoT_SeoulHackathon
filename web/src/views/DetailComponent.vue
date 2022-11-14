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
    <button @click='test()'>test</button>
    <div class="row g-3 pt-4">
      <div class="col-xl-4 col-lg-6" :key="i" v-for="(series, i) in dataSeries">
        <div class="card">
          <div class="card-body">
            <div class="card-title mt-1 ms-2 mb-0 text-start fs-6">
              {{ chartName[i] }}
            </div>
          </div>
          <VueApexCharts
            :options="dataSeries[i].chartOptions" :series="dataSeries[i].series"
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
      dataSeries: [],
      //
      currentTmp: [],
      emptyTmp: [],
      arrayTmp: [],
      objCurrentTmp: {},
      objEmptyTmp: {},
      objTmp: {},
      //
      chartName: []
      // dataChartArray: [
      //   {}, // noise
      //   {}, // park
      //   {}, // temp
      //   {}, // hum
      //   {}, // pm10
      //   {} // pm2.5
      // ]
    }
  },
  computed: { // store 처리 방식
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
    this.getParkingDataAVGAllTime(this.selectedIntegerDate[0], this.selectedIntegerDate[1])
  },
  methods: {
    async handleDate(modelData) {
      this.date = modelData
      this.$store.commit('selectedDate', this.date)
      this.getIntegerDate()
      this.dataSeries = []
      switch (this.dataType) {
        case 0:
          break
        case 1:
          this.getParkingDataAVGAllTime(this.selectedIntegerDate[0], this.selectedIntegerDate[1])
          console.log(this.dataSeries)
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
    test() {
      for (const i in this.dataSeries[0].series[0].data) {
        this.dataSeries[0].series[0].data[i] += 2
        // 한 가지 차트의 Series 데이터만 더해주는데도 모든 차트값이 올라가버림
      }
    },
    async getParkingDataAVGAllTime (start, end) {
      await this.getParkingDataAVGTime('오전(09~12시)', 0, start, end, '........09|........10|........11|........12')
      this.updateChart(0)
      await this.getParkingDataAVGTime('오후(13~16시)', 1, start, end, '........13|........14|........15|........16')
      this.updateChart(1)
      await this.getParkingDataAVGTime('저녁(17~19시)', 2, start, end, '........17|........18|........19')
      this.updateChart(2)
      await this.getParkingDataAVGTime('밤(20~22시)', 3, start, end, '........20|........21|........22')
      this.updateChart(3)
      console.log(this.dataSeries)
    },
    // 각 각 다른 값임을 분명히 확인하고 할당해도 전체 차트 값이 동일해짐
    async updateChart (index) {
      console.log(this.objCurrentTmp.data)
      console.log(this.objEmptyTmp.data)
      for (const i in this.objCurrentTmp.data) {
        console.log(i)
        this.dataSeries[index].series[0].data[i] = this.objCurrentTmp.data[i]
        console.log(this.objCurrentTmp.data[i])
      }
      for (const i in this.objEmptyTmp.data) {
        this.dataSeries[index].series[1].data[i] = this.objEmptyTmp.data[i]
      }
    },
    async getParkingDataAVGTime (name, index, start, end, time) {
      await this.$apiPost('/api/selectParkingDataAVGTime', { param: [start, end, time] })
        .then((res) => {
          this.chartName[index] = name
          for (const i in res) {
            this.currentTmp.push(res[i].avgCurrent)
            this.emptyTmp.push(res[i].avgEmpty)
            // this.dataSeries[index][0].data[i] = res[i].avgCurrent
            // this.dataSeries[index][1].data[i] = res[i].avgEmpty
            // console.log(this.dataSeries[index])
          }
          this.objCurrentTmp.name = '평균 주차 중'
          this.objEmptyTmp.name = '평균 빈 자리'
          this.objCurrentTmp.data = this.currentTmp
          this.objEmptyTmp.data = this.emptyTmp
          this.arrayTmp.push(this.objCurrentTmp)
          this.arrayTmp.push(this.objEmptyTmp)
          this.objTmp.series = this.arrayTmp
          this.objTmp.chartOptions = this.dataChartArray[this.dataType].chartOptions
          this.dataSeries.push(this.objTmp)
          // this.arrayTmp.push({ ...this.currentTmp, ...this.emptyTmp })
          this.currentTmp = []
          this.emptyTmp = []
          this.arrayTmp = []
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
