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
      <!--도면 슬라이드-->
      <Splide
        @splide:active="onMoved"
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
    <main class="px-3" style="background-color: white; font-size: 6px">
      <div class="container">
        <div class="mb-4" v-for="active in activeRoom" :key="active">
          <div class="row">
            <h4 class="align-self-baseline col-auto me-auto p-2 fw-bold">
              {{ active.target }}
            </h4>
            <button
              type="button"
              class="align-self-baseline col-auto btn btn-outline-danger"
              @click="btnDelete(active.target)"
            >
              삭제
            </button>
          </div>
          <!--센서가 존재할 시-->
          <div v-if="active.serial != ''">
            <!--현재 클릭된 방의 센서값 표 출력-->
            <table class="table">
              <!--센서 이름-->
              <thead>
                <tr>
                  <th scope="col" v-for="data in chartData" :key="data">
                    <p class="text-capitalize text-start fs-6 fw-normal">
                      {{ data }}
                    </p>
                  </th>
                </tr>
              </thead>
              <!--센서값-->
              <tbody>
                <tr>
                  <td v-for="data in chartData" :key="data">
                    <div v-for="check in floorData[active.floor]" :key="check">
                      <div v-if="check.serial == active.serial">
                        <p class="text-start fs-6">
                          {{ check[data] }}{{ unitData[data] }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p class="text-start fs-6">센서 정보 없음</p>
            <hr />
          </div>
        </div>
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
      // 클릭된 방 목록
      activeRoom: [],
      chartLength: 0,
      // DB
      axiosFloorData: [],
      // DB에서 값을 가져와 B1 ~ 6층의 값 저장
      floorData: [[], [], [], [], [], [], []],
      // 온도, 습도, 미세먼지, 초미세먼지, 소음
      chartData: ['temp', 'hum', 'fineDust', 'utraFineDust', 'noise'],
      // 기호
      unitData: {
        temp: '℃',
        hum: '%',
        fineDust: '㎍/㎥',
        utraFineDust: '㎍/㎥',
        noise: '㏈'
      },
      floorSerial: {
        2: ['V01G1613633', 'V01G1613634', 'V01G1613632', 'V01G1613538'],
        3: ['V01G1613636', 'V01G1613630', 'V01G1613631', 'V01G1613539'],
        4: ['V01G1613626', 'V01G1613628', 'V01G1613629', 'V01G1613543'],
        5: [
          'V01G1613604',
          'V01G1613625',
          'V01G1613611',
          'V01G1613612',
          'V01G1613619',
          'V01G1613624',
          'V01G1613623'
        ],
        6: ['V01G1613601', 'V01G1613544']
      }
    }
  },
  methods: {
    btnDelete(target) {
      for (let i = 0; i < this.chartLength; i++) {
        if (this.activeRoom[i].target === target) {
          this.activeRoom.splice(i, 1)
          this.chartLength--
          break
        }
      }
    },
    // 다음 슬라이드로 이동
    onMoved() {
      this.activeRoom.splice(0, this.activeRoom.length)
      this.chartLength = 0
    },
    // 해당 방 클릭
    roomClicked(e) {
      let check = true
      // 방이 이미 클릭된 상태인지 확인
      for (let i = 0; i < this.chartLength; i++) {
        if (this.activeRoom[i].target === e.target) {
          this.activeRoom.splice(i, 1)
          this.chartLength--
          check = false
        }
      }
      // 클릭된 상태가 아닐 시 추가
      if (check === true) {
        this.activeRoom.push(e)
        this.chartLength++
      }
    }
  },
  created() {
    this.floor = this.$route.query.floor
    // console.log(this.floorData)
  },
  mounted() {
    this.$apiPost('/api/selectAirFloorData').then((res) => {
      this.axiosFloorData = res
      // console.log('floorData: ' + JSON.stringify(this.axiosFloorData))
      for (const data of this.axiosFloorData) {
        // console.log(data)
        data.temp = parseInt((data.temp / 10 - 100) * 10) / 10

        for (let i = 2; i < 7; i++) {
          if (this.floorSerial[i].includes(data.serial)) {
            this.floorData[i].push(data)
            console.log(this.floorData[i])
          }
        }
      }
      console.log(this.floorData)
      // console.log(this.floorData[5][0].serial)
    })
  },
  name: 'App',
  components: { InnerBlueprintComponent, Splide, SplideSlide },
  setup() {}
}
</script>

<style scoped>
.h-container:after {
  clear: both;
  display: block;
  content: '';
}
</style>
