<template>
  <div>
    <main style="background-color: #556cff; text-align: center">
      <div class="container pb-4 pt-5">
        <div class="row mb-2">
          <h4 style="color: white; font-weight: bold">
            기관(마포중앙도서관) 실내데이터
          </h4>
        </div>
      </div>
      <Splide
        @splide:moved="onMoved"
        :options="{ rewind: true, start: this.floor }"
      >
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
        <div v-if="active.serial != ''">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" v-for="data in chartData" :key="data">
                  {{ data }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="data in chartData" :key="data">
                  <div v-for="check in floorData[active.floor]" :key="check">
                    <div v-if="check.Serial == active.serial">
                      {{ check[data] }}{{ unitData[data] }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>센서 정보 없음</div>
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
      floorData: [[], [], [], [], [], [], []],
      chartData: ['temperature', 'humid', 'finedust', 'ultrafinedust', 'noise'],
      unitData: {
        temperature: '℃',
        humid: '%',
        finedust: '㎍/㎥',
        ultrafinedust: '㎍/㎥',
        noise: '㏈'
      }
    }
  },
  methods: {
    onMoved() {
      this.activeRoom.splice(0, this.activeRoom.length)
      this.chartLength = 0
    },
    roomClicked(e) {
      let check = true
      for (let i = 0; i < this.chartLength; i++) {
        if (this.activeRoom[i].target === e.target) {
          this.activeRoom.splice(i, 1)
          this.chartLength--
          check = false
        }
      }
      if (check === true) {
        this.activeRoom.push(e)
        this.chartLength++
      }
    }
  },
  created() {
    this.floor = this.$route.query.floor
    this.$apiGet('/api/floor').then((response) => {
      this.axiosFloorData = response.data
      for (const data of this.axiosFloorData) {
        data.temperature = parseInt((data.temperature / 10 - 100) * 10) / 10
        if (data.noise === '999' && data.humid === '999') {
          data.humid = 'null '
          data.noise = 'null '
          data.temperature = 'null '
          data.ultrafinedust = 'null '
          data.finedust = 'null '
        }
        if (parseInt(data.floor) === -1) {
          // 지하 1층
          this.floorData[0].push(data)
        } else if (parseInt(data.floor) === 2) {
          // 2층
          this.floorData[2].push(data)
        } else if (parseInt(data.floor) === 3) {
          // 3층
          this.floorData[3].push(data)
        } else if (parseInt(data.floor) === 4) {
          // 4층
          this.floorData[4].push(data)
        } else if (parseInt(data.floor) === 5) {
          // 5층
          this.floorData[5].push(data)
        } else if (parseInt(data.floor) === 6) {
          // 6층
          this.floorData[6].push(data)
        }
      }
    })
    console.log(this.floorData)
  },
  name: 'App',
  components: { InnerBlueprintComponent, Splide, SplideSlide },
  setup() {}
}
</script>
