const request = require('request')

var express = require('express')
var router = express.Router()

var url = 'http://openapi.seoul.go.kr:8088/'
const key = '664462474168696e3537506f6d5445'
const type = 'json'
const service = 'IotVdata005'
var startIndex = 1
var endIndex = 2

//추가한 부분
var mysql = require('mysql')

// Connection 객체 생성
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '9808',
  database: 'airdb'
})

// Connect
connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error')
    console.error(err)
    throw err
  } else {
    console.log('airDB connected')
  }
})

router.get('/called', function (req, res) {
  // console.log(req)
  console.log('startIndex : ' + startIndex, 'endIndex: ' + endIndex)
  request(
    {
      url:
        url +
        key +
        '/' +
        type +
        '/' +
        service +
        '/' +
        startIndex +
        '/' +
        endIndex +
        '/',
      method: 'GET'
    },
    (error, response, body) => {
      const data = JSON.parse(body)
      console.log(data)

      res.send(data.IotVdata005['row'])
      // console.log(data.IotVdata005['row'])
    }
  )
})

router.post('/update', function (req, res) {
  startIndex = req.body.start
  endIndex = req.body.end
  console.log('startIndex : ' + startIndex, 'endIndex: ' + endIndex)

  request(
    {
      url:
        url +
        key +
        '/' +
        type +
        '/' +
        service +
        '/' +
        startIndex +
        '/' +
        endIndex +
        '/',
      method: 'GET'
    },
    (error, response, body) => {
      const data = JSON.parse(body)
      console.log(data)

      for (var i = 0; i < endIndex - startIndex + 1; i++) {
        connection.query(
          'INSERT INTO data (serial,obsdate,temp,hum,finedust,utrafinedust,noise) SELECT "' +
            data.IotVdata005['row'][i].COLUMN1 + // 시리얼
            '","' +
            data.IotVdata005['row'][i].COLUMN2 + // 관측시간
            '","' +
            data.IotVdata005['row'][i].COLUMN3 + // 온도
            '","' +
            data.IotVdata005['row'][i].COLUMN4 + // 습도
            '","' +
            data.IotVdata005['row'][i].COLUMN5 + // 미세먼지
            '","' +
            data.IotVdata005['row'][i].COLUMN9 + //초미세먼지
            '","' +
            data.IotVdata005['row'][i].COLUMN6 + //소음
            '" FROM DUAL WHERE NOT EXISTS (SELECT serial, obsdate FROM data WHERE serial ="' +
            data.IotVdata005['row'][i].COLUMN1 +
            '" AND obsdate = "' +
            data.IotVdata005['row'][i].COLUMN2 +
            '")',
          function (err, row2) {
            if (err) throw err
          }
        )
      }
      res.json({
        success: true,
        message: 'data pushed!'
      })
    }
  )
})

module.exports = router
