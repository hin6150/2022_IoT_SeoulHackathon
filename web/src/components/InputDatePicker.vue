<template>
    <Datepicker v-model="date" @update:modelValue="handleDate" range />
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const date = ref()
    const startDate = new Date()
    const endDate = new Date(new Date().setDate(startDate.getDate() - 7))
    date.value = [endDate, startDate]
    const handleDate = (modelData) => {
      date.value = modelData
      // do something else with the data
    }
    return {
      date,
      handleDate
    }
  }
}
</script>
