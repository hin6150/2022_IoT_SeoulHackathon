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
      <div class="mb-4" v-for="active in activeRoom" :key="active">
        <h4 class="mb-3" style="text-allign: left">{{ active.target }}</h4>
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
      chartLength: 0,
      axiosFloorData: [],
      floorData: [
        [],
        [],
        [],
        [],
        [],
        []
      ]
    }
  },
  methods: {
    roomClicked(e) {
      let check = true
      for (const i in this.chartLength) {
        console.log(i)
        if (this.activeRoom[i] === e) {
          this.activeRoom.splice(i, 1)
          this.chartLength--
          check = false
          console.log('pop')
          console.log(this.activeRoom)
        }
      }
      if (check === true) {
        this.activeRoom.push(e)
        this.chartLength++
      }
      console.log(this.activeRoom)
    }
  },
  created() {
    this.floor = this.$route.query.floor
    this.$apiGet('/api/floor')
      .then((response) => {
        this.axiosFloorData = response.data
        for (const data of this.axiosFloorData) {
          if (parseInt(data.floor) === -1) { // 지하 1층
            this.floorData[0].push(data)
          } else if (parseInt(data.floor) === 2) { // 2층
            this.floorData[1].push(data)
          } else if (parseInt(data.floor) === 3) { // 3층
            this.floorData[2].push(data)
          } else if (parseInt(data.floor) === 4) { // 4층
            this.floorData[3].push(data)
          } else if (parseInt(data.floor) === 5) { // 5층
            this.floorData[4].push(data)
          } else if (parseInt(data.floor) === 6) { // 6층
            this.floorData[5].push(data)
          }
        }
        console.log(this.floorData)
      })
  },
  name: 'App',
  components: { InnerBlueprintComponent, Splide, SplideSlide },
  setup() {}
}
</script>
