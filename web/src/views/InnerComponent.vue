<template>
  <div>
    <main style="background-color: #556cff">
      <div class="container py-5">
        <div class="row mb-4">
          <h4 style="color: white; font-weight: bold">
            기관(마포중앙도서관) 실내데이터
          </h4>
        </div>
      </div>
      <Splide :options="{ rewind: true, start: this.floor }">
        <SplideSlide v-for="i in 7" :key="i">
          <InnerBlueprintComponent
            :propFloor="i - 1"
            v-on:childEvent="roomClicked"
          />
        </SplideSlide>
      </Splide>
    </main>
    <hr />
    <main style="background-color: white">
      <div v-for="active in activeRoom" :key="active">
        <h4 style="text-allign: left">{{ active.target }}</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">온도</th>
              <th scope="col">습도</th>
              <th scope="col">미세먼지</th>
              <th scope="col">초미세먼지</th>
              <th scope="col">소음</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ active.alt }}</td>
              <td>{{ active.alt }}</td>
              <td>{{ active.alt }}</td>
              <td>{{ active.alt }}</td>
              <td>{{ active.alt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

import InnerBlueprintComponent from '@/components/InnerBlueprintComponent.vue'
export default {
  data() {
    return {
      floor: 0,
      activeRoom: [],
      chartLength: 0
    }
  },
  methods: {
    roomClicked(e) {
      let check = true
      console.log(this.chartLength)
      for (const i in this.chartLength) {
        console.log(i)
        if (this.activeRoom[i] === e) {
          this.activeRoom.splice(i, 1)
          this.chartLength--
          check = false
          console.log('pop')
        }
      }
      if (check === true) {
        this.activeRoom.push(e)
        this.chartLength++
      }
      console.log(this.chartLength)
      console.log(this.activeRoom)
    }
  },
  created() {
    this.floor = this.$route.query.floor
  },
  name: 'App',
  components: { InnerBlueprintComponent, Splide, SplideSlide },
  setup() {}
}
</script>
