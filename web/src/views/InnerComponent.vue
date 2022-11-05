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
                      <div v-if="check.Serial == active.serial">
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
      chartData: ['temperature', 'humid', 'finedust', 'ultrafinedust', 'noise'],
      // 기호
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
    // DB로부터 값 가져오기
    this.$apiGet('/api/floor').then((response) => {
      this.axiosFloorData = response.data
      for (const data of this.axiosFloorData) {
        data.temperature = parseInt((data.temperature / 10 - 100) * 10) / 10
        // Error 값일 경우 null처리
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
    // console.log(this.floorData)
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
