<template>
<div>
  <VueApexCharts :type="type" :options="chartOptions" :series="series"></VueApexCharts>
  <button>ih</button>
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
    }
  }
}
</script>
