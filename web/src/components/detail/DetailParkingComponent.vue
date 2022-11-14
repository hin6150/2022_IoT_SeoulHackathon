<template>
  <div class="row g-3 pt-4">
    <div class="col-xl-4 col-lg-6" :key="i" v-for="(series, i) in parkingOptions">
      <div class="card">
        <div class="card-body">
          <div class="card-title mt-1 ms-2 mb-0 text-start fs-6">
            {{ chartName[i] }}
          </div>
        </div>
        <!-- <VueApexCharts
          :options="parkingOptions[i].chartOptions" :series="parkingSeries[i].series"
        ></VueApexCharts> -->
        <VueApexCharts
        :options="parkingOptions[i].chartOptions" :series="parkingSeries[i].series">
        </VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  data() {
    return {
      currentTmp: [],
      emptyTmp: [],
      chartName: [],
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
      ],
      parkingOptions: []
    }
  },
  props: {
    selectedIntegerDate: Array,
    dataType: Number
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
  },
  mounted () {
    for (let i = 0; i < 4; i++) {
      this.parkingOptions[i] = this.dataChartArray[this.dataType]
    }
    this.getParkingDataAVGAllTime(this.selectedIntegerDate[0], this.selectedIntegerDate[1])
  },
  methods: {
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
    }
  },
  components: { VueApexCharts }
}
</script>
