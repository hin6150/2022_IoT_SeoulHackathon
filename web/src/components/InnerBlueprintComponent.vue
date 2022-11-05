<template>
  <div class="container" style="color: white">
    <h4 v-if="floor === 0">지하 1층</h4>
    <h4 v-else>{{ floor }}층</h4>
    <text>
      {{ sampleData }}
    </text>
    <div class="col-md-15 mb-3 align-self-center">
      <div
        class="row-md-8 mt-3 mb-5 mx-4 shadow px-4 py-4 rounded-4"
        style="background-color: white; border: 1px solid"
      >
        <img
          :src="imgSrc"
          :usemap="useMap"
          :id="imgId"
          @load="imgResize()"
          class="img-fluid"
        />
        <map :name="mapId" :id="mapId">
          <area
            :key="map.alt"
            v-for="map in mapSrc"
            :shape="map.shape"
            :coords="map.coords"
            :title="map.title"
            @mouseover="over(map.target)"
            @mouseout="out"
            @click="roomClicked(map)"
          />
        </map>
      </div>
    </div>
  </div>
</template>
<script>
import imgMap from '../assets/imgMap/map'
export default {
  name: 'InnerBlueprintComponent',
  props: {
    propFloor: Number
  },
  emits: ['childEvent'],
  data() {
    return {
      // 현재 보여줄 층 번호
      floor: 0,
      // 현재 마우스가 위치한 방 출력
      sampleData: '시설을 클릭해주세요',
      imgSrc: '',
      mapSrc: [],
      width: 0,
      // map + floor
      mapId: '',
      // img + floor
      imgId: '',
      // # + mapId
      useMap: ''
    }
  },
  methods: {
    setSrc() {
      this.mapSrc = imgMap[this.floor]
      this.imgSrc = require('../assets/imgMap/img_facility_floor_' +
        this.floor +
        'F.png')
      this.mapId = 'map' + this.floor
      this.imgId = 'img' + this.floor
      this.useMap = '#' + this.mapId
    },
    // Mouse Over
    over(title) {
      this.sampleData = title
    },
    // Mouse Out
    out() {
      this.sampleData = '시설을 클릭해주세요'
    },
    // Clicked
    roomClicked(title) {
      this.$emit('childEvent', title)
    },
    /* eslint-disable one-var */
    // 이미지의 크기변화에 따라 Map의 좌표값 변환
    imgResize() {
      // 이미지의 원본 크기를 originWidth 저장
      let originWidth = this.width
      /* ImageMapFunction 함수 선언 */
      const ImageMapFunction = function (map, img) {
          // 선언 및 생성
          const areas = map.getElementsByTagName('area'),
            len = areas.length,
            coords = []
          // coords에 map의 좌표값 넣기
          for (let n = 0; n < len; n++) {
            coords[n] = areas[n].coords.split(',')
          }
          // 해당 이미지가 resize시 fucntion 실행
          this.resizeImg = function () {
            // (현재 이미지 크기 / 원래 이미지 크기)로 변화값 구하기
            const ratio = img.offsetWidth / originWidth
            for (let n = 0; n < len; n++) {
              const clen = coords[n].length
              // 좌표값(coords)에 변한 크기만큼 *연산
              for (let m = 0; m < clen; m++) {
                coords[n][m] *= ratio
              }
              // 좌표값 "," 으로 join
              areas[n].coords = coords[n].join(',')
            }
            // 이미지의 원본 크기값을 현재 크기로 변경
            originWidth = img.offsetWidth
            // resizeImg fuction 종료
            return true
          }
          // window가 resize 될시 resizeImg 함수 실행
          window.addEventListener('resize', function () {
            imageMap.resizeImg()
          })
        },
        /* 함수 선언 종료 */
        // imageMap을 ImageMapFunction 함수로 생성
        imageMap = new ImageMapFunction(
          document.getElementById(this.mapId),
          document.getElementById(this.imgId)
        )
      // imgMap에 resizeImg 함수 실행
      imageMap.resizeImg()
    }
  },
  created() {
    this.floor = this.propFloor
    this.setSrc()
    const img = new Image()
    img.src = this.imgSrc
    this.width = img.width
  }
}
</script>
