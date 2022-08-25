import { createStore } from 'vuex'

export default createStore({
  state: {
    floorDataList: [
      {
        floorNumber: 6,
        value: '6F',
        floorFacilityData: '6층 시설 정보 : 세미나실, 마중홀, 강사휴게실',
        floorSensorData: '6층 센서 정보 : 온도, 습도, 미세먼지'
      },
      {
        floorNumber: 5,
        value: '5F',
        floorFacilityData: '5층 시설 정보 : 청소년 지도자실, 악기연주실, 무용연습실',
        floorSensorData: '5층 센서 정보 : 온도, 습도, 미세먼지'
      },
      {
        floorNumber: 4,
        value: '4F',
        floorFacilityData: '4층 시설 정보 : 자료열람실II, 전산실, 장애인열람석, 서비스지원실',
        floorSensorData: '4층 센서 정보 : 온도, 습도, 미세먼지'
      },
      {
        floorNumber: 3,
        value: '3F',
        floorFacilityData: '3층 시설 정보 : 자료열람실I, 자료정리실, 상호대차준비실',
        floorSensorData: '3층 센서 정보 : 온도, 습도, 미세먼지'
      },
      {
        floorNumber: 2,
        value: '2F',
        floorFacilityData: '2층 시설 정보 : 북카페, 유아자료실, 꿈나래방, 수유실',
        floorSensorData: '2층 센서 정보 : 온도, 습도, 미세먼지'
      },
      {
        floorNumber: 1,
        value: '1F',
        floorFacilityData: '1층 시설 정보 : 갤러리, 쁘띠몽드키즈카페, 공영주차장',
        floorSensorData: '1층 센서 정보 : 온도, 습도, 미세먼지'
      },
      {
        floorNumber: 0,
        value: 'B1',
        floorFacilityData: '지하 1층 시설 정보 : 관리실, 구내식당, 편의점',
        floorSensorData: '지하 1층 센서 정보 : 온도, 습도, 미세먼지'
      }
    ]
  },
  getters: { // 중복되는 computed 메소드 통합 사용
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
