<template>
  <div>
    <!-- dark mode : bg-dark -->
    <div style="background-color: #556cff; text-align: center">
      <div class="container py-4">
        <div class="row mb-3">
          <h4 style="color: white; font-weight: bold">
            기관(마포중앙도서관) 전체데이터
          </h4>
        </div>
        <div class="row mt-3 ms-2">
          <div class="row">
            <!-- dark mode : col-md-6 mb-2 bg-dark -->
            <div class="col-md-6 mb-2">
              <div class="container">
                <p class="data_title">층별데이터</p>
                <!-- dark mode : row mb-2 rounded-3 text-black -->
                <div
                  :key="floor"
                  v-for="floor in floorDataList"
                  class="row mb-2 rounded-3 bg-white"
                  style="cursor: pointer; font-size: 12px;"
                  data-bs-toggle="modal"
                  :data-bs-target="'#floorModal' + floor.floorNumber"
                >
                  <text class="my-2">{{ floor.value }}</text>
                  <div
                    class="modal fade"
                    :id="'floorModal' + floor.floorNumber"
                    tabindex="-1"
                    :aria-labelledby="'floorModalLabel' + floor.floorNumber"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            :id="'floorModalLabel' + floor.floorNumber"
                          >
                            {{ floor.value }}
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          {{ floor.facilityInfoString }}<br />
                          {{ floor.sensorInfoString }}
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="goToInner(floor.floorNumber)"
                          >
                            이동하기
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            닫기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 ps-md-4" style="text-align: center;">
              <p class="data_title">야외데이터</p>
              <div class="col rounded-4 bg-white" style="font-size: 10px">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">날씨상태</th>
                      <th scope="col">온/습도</th>
                      <th scope="col">미세먼지(PM10)</th>
                      <th scope="col">초미세먼지(PM2.5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        {{ weatherStatus }}
                      </th>
                      <td>
                        {{ weatherData[0].temp }}℃<br/>
                        {{ weatherData[0].humidity }}%
                      </td>
                      <td>
                        {{ weatherData[1].pm10 }}
                      </td>
                      <td>
                        {{ weatherData[1].pm2_5 }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="data_title">
                주차데이터
              </p>
              <div class="col rounded-4 bg-white" style="font-size: 10px">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">주차장 총 구역</th>
                      <th scope="col">주차 가능 구역</th>
                      <th scope="col">주차 불가능 구역</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="park" v-for="park in parkInfoList">
                      <th scope="row">{{ park.floor }}</th>
                      <td>{{ park.parkingSpace }}</td>
                      <td>{{ park.emptySpace }}</td>
                      <td>{{ park.currentSpace }}</td>
                    </tr>
                  </tbody>
                </table>
                <hr>
                <div class='pb-3'>데이터 측정 일시 : {{ obsDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-sm-6 mb-3 align-self-center">
          <img src="./../../public/monitoring.png" class="img-fluid rounded" />
        </div>
        <div class="col-md-5 offset-md-1 col-sm-6 align-self-center">
          <form class="pt-1 ms-2 me-2">
            <h4>통계 데이터</h4>
            <hr/>
            <div style="text-align: left">
              <p>모든 데이터를 통계로 보세요</p>
              <p>
                데이터 종류, 기간, 필터, 그래프 종류 등 원하는 데이터를
                시각화할 수 있습니다.<br />
                그래프를 고르기 어렵다면 대시보드 모드를 사용해보세요.<br />
                여러 가지 그래프로 당신의 데이터를 나타내 준답니다.
              </p>
            </div>
            <div class="d-flex flex-row justify-content-end flex-sm-row w-100 gap-2">
              <div class="p-2">
                <button class="btn btn-primary" @click="goToStatistic" type="button"
                style="float: right">
                  통계데이터
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 실시간 야외 데이터(날씨상태, 온습도, 미세먼지)
      urlWeatherApi: 'https://api.openweathermap.org/data/2.5/weather?lat=37.568&lon=126.978&appid=cbe5bdc9b8d6bb30982a8e86f3473069&units=metric',
      urlAirApi: 'http://api.openweathermap.org/data/2.5/air_pollution?lat=37.568&lon=126.978&appid=cbe5bdc9b8d6bb30982a8e86f3473069',
      weatherStatus: '',
      weatherData: [[], []],
      weatherInterval: {},
      // 임시 주차데이터 리스트
      parkInfoList: [
        {
          floor: '1F',
          parkingSpace: 0,
          currentSpace: 0,
          emptySpace: 0
        },
        {
          floor: 'B1',
          parkingSpace: 0,
          currentSpace: 0,
          emptySpace: 0
        },
        {
          floor: 'B2',
          parkingSpace: 0,
          currentSpace: 0,
          emptySpace: 0
        }
      ],
      obsDate: '',
      // 임시 층별데이터 리스트
      floorDataList: []
    }
  },
  created() {
    this.floorDataList = this.$store.state.floorDataList
    this.getWeatherAPI()
    this.$apiPost('/api/selectParkingDataLatest', {})
      .then((res) => {
        this.$store.commit('iotDataArrayParking', res)
        const date = res[0].obsDate
        this.obsDate = date.slice(0, 4) + '년 ' + date.slice(4, 6) + '월 ' + date.slice(6, 8) + '일 ' + date.slice(8, 10) + '시'
        for (const data in res) {
          this.parkInfoList[data].parkingSpace = res[data].parkingSpace
          this.parkInfoList[data].currentSpace = res[data].currentSpace
          this.parkInfoList[data].emptySpace = res[data].emptySpace
        }
      }).catch((err) => {
        console.log(err)
      })
  },
  methods: {
    getWeatherAPI () { // open weather map api
      this.$apiGet(this.urlWeatherApi)
        .then((response) => {
          this.weatherStatus = response.data.weather[0].description
          this.weatherData[0] = response.data.main
        })
        .catch((err) => {
          console.log(err)
        })
      this.$apiGet(this.urlAirApi)
        .then((response) => {
          this.weatherData[1] = response.data.list[0].components
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goToInner(floor) {
      this.$router.push({
        path: '/inner',
        query: {
          floor: floor
        }
      })
    },
    goToStatistic() {
      this.$router.push({ path: '/statistic' })
    }
  },
  mounted() { // 1분 갱신 주기로 야외데이터 날씨 정보 업데이트
    this.weatherInterval = setInterval(() => {
      this.getWeatherAPI()
    }, 60000)
  },
  unmounted() {
    clearInterval(this.weatherInterval)
  }
}
</script>

<style scoped>
  .data_title {
    color: white;
    font-weight: bold;
  }
</style>
