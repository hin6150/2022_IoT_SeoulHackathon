<template>
  <div>
    <main>
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
            <div class="col col-md-5">
              <Datepicker
                v-model="date_first"
                range
                @update:modelValue="handleDate_first"
              />
              <Datepicker
                v-if="dataType !== 4 && dataType !== 5"
                v-model="date_second"
                range
                @update:modelValue="handleDate_second"
              />
            </div>
          </div>
        </div>
        <div class="row g-3 pt-4">
          <div class="col-lg-6" :key="i" v-for="(floor, i) in floorDataList">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mt-3 ms-2 text-start">
                  {{ floorDataList[i].value }}
                </h5>
              </div>
              <VueApexCharts
                :options="dataChartArray[dataType].chartOptions"
                :series="dataChartArray[dataType].series"
              ></VueApexCharts>
            </div>
          </div>
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
  data() {
    return {
      date_first: null,
      date_second: null,
      dataType: 0,
      dataChartArray: [
        {}, // noise
        {}, // park
        {}, // temp
        {}, // hum
        {}, // pm10
        {} // pm2.5
      ],
      dataChartName: [],
      floorDataList: []
    }
  },
  created() {
    // 차트 데이터 타입 설정
    this.dataType = parseInt(this.$route.query.dataType)
    this.dataChartArray = this.$store.state.iotDataArray
    this.dataChartName = this.$store.state.dataChartName
    this.floorDataList = this.$store.state.floorDataList
  },
  methods: {
    handleDate_first(modelData) {
      this.date_first = modelData
      console.log(this.date_first)
      if (this.dataType === 4 || this.dataType === 5) {
        // axios changed data and update chart
        console.log('do it axios first')
      }
    },
    handleDate_second(modelData) {
      this.date_second = modelData
      console.log(this.date_second)
      if (this.date_first) {
        // axios changed data and update chart
        console.log('do it axios second')
      }
    }
  },
  watch: {
    date_first() {
      console.log('first data changed')
    },
    date_second() {
      console.log('second data changed')
    }
  },
  components: { VueApexCharts, Datepicker }
}
</script>
