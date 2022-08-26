<template>
  <div>
    <main style="background-color: #556CFF">
      <div class="container py-4">
        <div class="row mb-3">
          <h4 style="color: white; font-weight: bold;">기관(마포중앙도서관) 전체데이터</h4>
        </div>
        <div class="row mt-3 ms-2">
          <div class="row">
            <div class="col-md-6 mb-2" style="background-color: #556CFF; text-align: center;">
              <div class="container">
                <p style="color: white; font-weight:bold;">층별데이터</p>
                <div :key="floor" v-for="floor in floorDataList" class="row mb-2 rounded-3"
                style="background-color: white; cursor: pointer; font-size: 12px;" data-bs-toggle="modal" :data-bs-target="'#floorModal' + floor.floorNumber">
                  <text class="my-2">{{ floor.value }}</text>
                  <div class="modal fade" :id="'floorModal' + floor.floorNumber" tabindex="-1" :aria-labelledby="'floorModalLabel' + floor.floorNumber" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" :id="'floorModalLabel' + floor.floorNumber">{{ floor.value }}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          {{ floor.facilityInfoString }}<br>
                          {{ floor.sensorInfoString }}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" @click="goToInner(floor.floorNumber)">이동하기</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 ps-md-4" style="background-color: 73b3ef">
              <p style="color: white; font-weight:bold;">야외데이터</p>
              <div class="col rounded-4" style="background-color: white; font-size:10px;">
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
                      <th scope="row">{{ weatherStatus }}</th>
                      <td>{{ weatherData[0].temp }}℃<br>{{ weatherData[0].humidity }}%</td>
                      <td>{{ weatherData[1].pm10 }}</td>
                      <td>{{ weatherData[1].pm2_5 }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style="text-align: center; color: white; font-weight:bold;">주차데이터</p>
              <div class="col rounded-4" style="background-color: white; font-size:10px;">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">이미지임</th>
                      <th scope="col">주차장 총 구역</th>
                      <th scope="col">주차 가능 구역</th>
                      <th scope="col">주차 불가능 구역</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="park" v-for="park in parkInfoList">
                      <th scope="row">{{ park.floor }}</th>
                      <td>{{ park.total_park }}</td>
                      <td>{{ park.enable_park }}</td>
                      <td>{{ park.unable_park }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <hr>
    <main style="background-color: white">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-6 mb-3 align-self-center">
            <img src="./../../public/monitoring.png" class="img-fluid">
          </div>
          <div class="col-md-5 offset-md-1 col-sm-6 align-self-center">
            <form class="pt-1">
              <h4 style="font-weight: bold">통계 데이터</h4><hr>
              <div style="text-align: left">
                <p>모든 데이터를 통계로 보세요</p>
                <p>데이터 종류, 기간, 필터, 그래프 종류 등 원하는 데이터를 시각화할 수 있습니다.<br>
                그래프를 고르기 어렵다면 대시보드 모드를 사용해보세요.<br>
                여러 가지 그래프로 당신의 데이터를 나타내 준답니다.</p>
              </div>
              <div class="d-flex flex-row justify-content-end flex-sm-row w-100 gap-2">
                <div class="p-2">
                  <button class="btn btn-primary" type="button" style="float: right" @click="goToStatistic">통계데이터</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 실시간 야외 데이터(날씨상태, 온습도, 미세먼지)
      weatherStatus: '',
      weatherData: [[], []],
      // 뷰 인스턴스 제거(페이지 이동)시 interval 제거용
      weatherInterval: {},
      airInterval: {},
      // 임시 주차데이터 리스트
      parkInfoList: [
        {
          floor: '2F',
          total_park: 120,
          enable_park: 96,
          unable_park: 22
        },
        {
          floor: '1F',
          total_park: 50,
          enable_park: 45,
          unable_park: 5
        },
        {
          floor: 'B1',
          total_park: 50,
          enable_park: 34,
          unable_park: 16
        }
      ],
      // 임시 층별데이터 리스트
      floorDataList: []
    }
  },
  created () {
    // 데이터 일회성 초기 할당
    this.floorDataList = this.$store.state.floorDataList
    this.$apiGet('https://api.openweathermap.org/data/2.5/weather?lat=37.568&lon=126.978&appid=cbe5bdc9b8d6bb30982a8e86f3473069&units=metric')
      .then((response) => {
        this.weatherStatus = response.data.weather[0].description
        this.weatherData[0] = response.data.main
      }).catch((err) => {
        console.log(err)
      })
    this.$apiGet('http://api.openweathermap.org/data/2.5/air_pollution?lat=37.568&lon=126.978&appid=cbe5bdc9b8d6bb30982a8e86f3473069')
      .then((response) => {
        this.weatherData[1] = response.data.list[0].components
      }).catch((err) => {
        console.log(err)
      })
    // 메인 페이지 주차장 초기화
    this.$apiGet('/api')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.parkInfoList[i].total_park = response.data[i].TotalParkingLot
          this.parkInfoList[i].enable_park = response.data[i].availableparking
          this.parkInfoList[i].unable_park = response.data[i].emptyparking
        }
      })
  },
  methods: {
    // goTo~~~ -> @click을 통한 라우팅 지정
    goToInner (floor) {
      this.$router.push({
        path: '/inner',
        query: {
          floor: floor
        }
      })
    },
    goToStatistic () {
      this.$router.push({ path: '/statistic' })
    },
    // 반복 setInterval 비동기 함수의 반복을 중지해주는 clearInterval
    stopRepeat (weatherInterval, airInterval) {
      clearInterval(weatherInterval)
      clearInterval(airInterval)
    }
  },
  mounted () {
    // 데이터 n초마다 받아오는 부분(실시간 업데이트 처리)
    this.weatherInterval = setInterval(() => {
      this.$apiGet('https://api.openweathermap.org/data/2.5/weather?lat=37.568&lon=126.978&appid=cbe5bdc9b8d6bb30982a8e86f3473069&units=metric')
        .then((response) => {
          this.weatherStatus = response.data.weather[0].description
          this.weatherData[0] = response.data.main
        }).catch((err) => {
          console.log(err)
        })
    }, 60000)
    this.airInterval = setInterval(() => {
      this.$apiGet('http://api.openweathermap.org/data/2.5/air_pollution?lat=37.568&lon=126.978&appid=cbe5bdc9b8d6bb30982a8e86f3473069')
        .then((response) => {
          this.weatherData[1] = response.data.list[0].components
        }).catch((err) => {
          console.log(err)
        })
    }, 60000)
  },
  unmounted () {
    this.stopRepeat(this.weatherInterval, this.airInterval)
  }
}
</script>
