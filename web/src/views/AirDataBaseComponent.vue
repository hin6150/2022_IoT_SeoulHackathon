<template>
  <div class="hello">
    <h4>AIR DATABASE</h4>
    <button @click="called">CALL API</button>
    <button @click="update">UPDATE API</button>
    <button @click="create">MAKE DBTABLE</button>
    <button @click="updateALL">UPDATE ALL</button>
    <button @click="goToParking">GO TO PARKING</button>
    <p>*startIndex는 endIndex보다 작아야함.</p>
    <p>*한번에 호출할 수 있는 개수는 1000개 미만.</p>
    startIndex:
    <input v-model.number="startIndex" type="number" />
    <p></p>
    endIndex:
    <input v-model.number="endIndex" type="number" />
    <ul>
      <li>
        {{ apiData }}
        <hr />
      </li>
      <li v-for="(data, index) in apiData" :key="index">
        <p>시리얼 COLUMN1: {{ data.COLUMN1 }}</p>
        <p>데이터관측일시 COLUMN2: {{ data.COLUMN2 }}</p>
        <p>온도 COLUMN3: {{ data.COLUMN3 / 10 - 100 }}</p>
        <p>습도(%) COLUMN4: {{ data.COLUMN4 }}</p>
        <p>미세먼지(㎍/㎥) COLUMN5: {{ data.COLUMN5 }}</p>
        <p>초미세먼지(㎍/㎥) COLUMN9: {{ data.COLUMN9 }}</p>
        <p>소음(㏈) COLUMN6: {{ data.COLUMN6 }}</p>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      apiData: [],
      startIndex: 1,
      endIndex: 2,
      length: 43056
    }
  },
  created() {
    // this.$http.get('/api/users').then((response) => {
    //   this.users = response.data
    // })
  },
  methods: {
    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds))
    },
    update: function (event) {
      this.$http
        .post('/api/airData/update', {
          start: this.startIndex,
          end: this.endIndex
        })
        .then((res) => {
          if (res.data.success === true) {
            alert(res.data.message)
          }
          if (res.data.success === false) {
            alert(res.data.message)
          }
        })
        .catch(function (error) {
          alert(error + 'error!')
        })
    },
    called: function (event) {
      this.$http
        .get('/api/airData/called', { start: this.startIndex })
        .then((response) => {
          this.apiData = response.data
        })
    },
    create: function (event) {
      this.$http
        .post('/api/airData/create', {})
        .then((res) => {
          if (res.data.success === true) {
            alert(res.data.message)
          }
          if (res.data.success === false) {
            alert(res.data.message)
          }
        })
        .catch(function (error) {
          alert(error + 'error!')
        })
    },
    updateALL: async function (event) {
      for (let i = 0; i < parseInt(this.length / 1000); i++) {
        this.startIndex = 1 + i * 1000
        this.endIndex = 1000 + i * 1000
        this.$http
          .post('/api/airData/update', {
            start: this.startIndex,
            end: this.endIndex
          })
          .then((res) => {})
          .catch(function (error) {
            console.log(error + 'error!')
          })
        await this.sleep(500)
      }
      this.startIndex += 1000
      this.endIndex = this.length
      this.$http
        .post('/api/airData/update', {
          start: this.startIndex,
          end: this.endIndex
        })
        .then((res) => {})
        .catch(function (error) {
          console.log(error + 'error!')
        })
    },
    goToParking() {
      this.$router.push({ path: '/parking' })
    }
  }
}
</script>
