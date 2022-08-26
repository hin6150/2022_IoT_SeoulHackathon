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
          <div class="col-md-6" :key="i" v-for="(data, i) in dataChartArray">
            <div class="card" @click="goToDetail(i)">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">{{ dataChartName[i] }}</h5>
              </div>
              <VueApexCharts :options="data.chartOptions" :series="data.series"></VueApexCharts>
            </div>
          </div>
          <!-- <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">주차장</h5>
              </div>
              <VueApexCharts :options="parkDataSet.chartOptions" :series="parkDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 온도(℃)</h5>
              </div>
              <VueApexCharts :options="tempDataSet.chartOptions" :series="tempDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 습도(%)</h5>
              </div>
              <VueApexCharts :options="humDataSet.chartOptions" :series="humDataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 미세먼지(PM10)</h5>
              </div>
              <VueApexCharts :options="PM_10_DataSet.chartOptions" :series="PM_10_DataSet.series"></VueApexCharts>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">실내 초미세먼지(PM2.5)</h5>
              </div>
              <VueApexCharts :options="PM_2_5_DataSet.chartOptions" :series="PM_2_5_DataSet.series"></VueApexCharts>
            </div>
          </div> -->
        </div>
      </div>
    </main>
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
      dataType: '',
      dataChartName: [],
      dataChartArray: [
        {}, // noise
        {}, // park
        {}, // temp
        {}, // hum
        {}, // pm10
        {} // pm2.5
      ],
      postDate: []
    }
  },
  created () {
    // 출력 기간 기본값(7일)
    const date = new Date()
    const startDate = new Date(new Date().setDate(date.getDate() - 9))
    const endDate = new Date(new Date().setDate(date.getDate() - 2))
    this.date = [startDate, endDate]
    this.dataChartArray = this.$store.state.iotDataArray
    this.dataChartName = this.$store.state.dataChartName
    console.log(this.date[0])
    this.postDate = String(this.date[0]).split(' ')[1]
    console.log(this.postDate)
  },
  mounted () {
  },
  methods: {
    handleDate (modelData) {
      this.date = modelData
      console.log(this.date)
      // axios changed data and update chart
    },
    goToDetail (typeNum) {
      this.$router.push({
        path: '/detail',
        query: { dataType: typeNum }
      })
    },
    change () { // 날짜 선택 후 차트 렌더링
      console.log('sample')
    }
  },
  name: 'App',
  components: { VueApexCharts, Datepicker }
}
</script>
