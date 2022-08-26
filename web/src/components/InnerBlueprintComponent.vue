<template>
  <div class="container">
    <h4>{{ floor }}층</h4>
    <text>
      {{ sampleData }}
    </text>
    <div class="col-md-15 mb-3 align-self-center">
      <div
        class="row-md-8 px-4 py-4 rounded-4"
        style="background-color: #f7f7f7"
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
      floor: 0, // 현재 보여줄 층 번호
      sampleData: 'Out',
      imgSrc: '',
      mapSrc: [],
      width: 0,
      mapId: '',
      imgId: '',
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
    over(title) {
      this.sampleData = title + ' 접근'
    },
    out() {
      this.sampleData = 'Out'
    },
    roomClicked(title) {
      this.$emit('childEvent', title)
    },
    /* eslint-disable one-var */
    imgResize() {
      let previousWidth = this.width
      const ImageMap = function (map, img) {
          const areas = map.getElementsByTagName('area'),
            len = areas.length,
            coords = []

          for (let n = 0; n < len; n++) {
            coords[n] = areas[n].coords.split(',')
          }
          this.resize = function () {
            const x = img.offsetWidth / previousWidth
            for (let n = 0; n < len; n++) {
              const clen = coords[n].length
              for (let m = 0; m < clen; m++) {
                coords[n][m] *= x
              }
              areas[n].coords = coords[n].join(',')
            }
            previousWidth = img.offsetWidth
            return true
          }
          window.addEventListener('resize', function () {
            imageMap.resize()
          })
        },
        imageMap = new ImageMap(
          document.getElementById(this.mapId),
          document.getElementById(this.imgId)
        )
      imageMap.resize()
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
