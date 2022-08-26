import axios from 'axios'

export default {
  methods: {
    async $apiPost (url, data) {
      return (await axios({
        method: 'post',
        url,
        data
      }).catch(e => {
        console.log(e)
      })).data
    },
    async $apiGet (url) {
      return (await axios({
        method: 'get',
        url
      }).catch(e => {
        console.log(e)
      })
      )
    }
  }
}
