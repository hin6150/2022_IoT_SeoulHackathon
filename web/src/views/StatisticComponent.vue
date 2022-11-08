<template>
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
        <button @click='test()'>test</button>
        <div class="col col-md-6">
          <Datepicker v-model="date" range @update:modelValue="handleDate"/>
        </div>
      </div>
    </div>
    <div class="row g-3 pt-4">
      <div class="col-md-6" :key="i" v-for="(data, i) in dataChartArray">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mt-3 ms-2 text-start" style="cursor: pointer"
            data-bs-toggle="tooltip" data-bs-placement="top"
            title="클릭 시 상세페이지로 이동" @click="goToDetail(i)"
            >
              {{ dataChartName[i] }}
            </h5>
          </div>
          <VueApexCharts :options="data.chartOptions" :series="data.series"></VueApexCharts>
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
  data () {
    return {
      date: null,
      selectedIntegerDate: ['', ''],
      monthNum: [0, 0]
      // dataChartName: [],
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
    // selectedDate () {
    //   return this.$store.getters.getSelectedDate
    // },
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
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    if (this.selectedDate[0].length === 0) {
      this.setupDefaultDate(2, 9)
    } else {
      this.date = this.selectedDate
    }
    this.getIntegerDate()
  },
  methods: {
    test () {
      this.$apiPost('/api/selectBasicInformation', {})
        .then((res) => {
          console.log(res)
        })
    },
    // 출력 기간 기본값(y - x일 -> x일전부터 y일전까지)
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
        this.selectedIntegerDate[i] = integerDate
      }
    },
    handleDate (modelData) {
      this.date = modelData
      // this.$store.commit('selectedDate', this.date)
      this.$store.commit('selectedDate', this.date)
      console.log(this.date)
      this.getIntegerDate()
      console.log(this.selectedIntegerDate)
      // this.$apiPost('/api/calendar', { param: this.postDate })
      //   .then((response) => {
      //     console.log(response)
      //     this.dataChartArray[0].series[0].data = [80, 70, 60, 50, 40, 30]
      //   })
    },
    goToDetail (typeNum) {
      this.$router.push({
        path: '/detail',
        query: { dataType: typeNum }
      })
    }
  },
  components: { VueApexCharts, Datepicker }
}
</script>
