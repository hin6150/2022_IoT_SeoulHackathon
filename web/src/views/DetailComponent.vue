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
      <div class="col-xl-4 col-lg-6" :key="i" v-for="(floor, i) in floorDataList">
        <div class="card">
          <div class="card-body">
            <div class="card-title mt-1 ms-2 mb-0 text-start fs-6">
              {{ floorDataList[i].value }}
            </div>
          </div>
          <VueApexCharts
            :options="dataChartArray[dataType].chartOptions"
            :series="dataChartArray[dataType].series"
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
      dataType: 0
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
  created() {
    window.scrollTo(0, 0)
    // view 처리 방식
    // this.dataChartArray = this.$store.state.iotDataArray
    // this.dataChartName = this.$store.state.dataChartName
    // this.floorDataList = this.$store.state.floorDataList
    this.dataType = parseInt(this.$route.query.dataType)
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
  mounted () {
    if (this.selectedDate[0].length === 0) {
      this.setupDefaultDate(2, 9)
    } else {
      this.date = this.selectedDate
    }
  },
  methods: {
    setupDefaultDate (startBeforeDayCount, endBeforeDayCount) {
      const date = new Date()
      const startDate = new Date(new Date().setDate(date.getDate() - endBeforeDayCount))
      const endDate = new Date(new Date().setDate(date.getDate() - startBeforeDayCount))
      this.date = [startDate, endDate]
    },
    handleDate(modelData) {
      this.date = modelData
      this.$store.commit('selectedDate', this.date)
      console.log(this.date)
      if (this.dataType === 4 || this.dataType === 5) {
        // axios changed data and update chart
        console.log('do it axios first')
      }
    }
  },
  components: { VueApexCharts, Datepicker }
}
</script>
