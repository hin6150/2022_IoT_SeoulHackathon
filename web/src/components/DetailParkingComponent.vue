<template>
  <div>
    <VueApexCharts
    :options="dataChartArray[1].chartOptions" :series="dataSeries[i].series">
    </VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
export default {
  data() {
    return {
      seriesAM: [],
      seriesPM: [],
      seriesDinner: [],
      seriesNight: []
    }
  },
  props: {
    date: String
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
  created: {

  },
  mounted: {

  },
  methods: {

  },
  components: { VueApexCharts }
}
</script>
