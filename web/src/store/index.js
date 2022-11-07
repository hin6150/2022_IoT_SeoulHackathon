import { createStore } from 'vuex'

export default createStore({
  state: {
    floorDataList: [
      {
        floorNumber: 6,
        value: '6F',
        facilities: ['수유실', '사서실', '집중회의실'],
        facilityInfoString: '6층 센서 위치 : 수유실, 사서실, 집중회의실',
        sensorInfoString:
          '6층 센서 정보 : 온도, 습도, 소음, 미세먼지, 초미세먼지'
      },
      {
        floorNumber: 5,
        value: '5F',
        facilities: [
          '피아노 연주실',
          '악기 연주실',
          '무용연기실',
          '연기연습실',
          '음악 개인연습실',
          '문화강연방',
          '생각나눔방',
          '상호대처실',
          '자료정리실',
          '유아자료실',
          '꿈나래방'
        ],
        facilityInfoString:
          '5층 센서 위치 : 피아노 연주실, 악기 연주실, 무용연기실, 연기연기실, 음악 개인연습실, 문화강연방, 생각나눔방, 상호대처실, 자료정리실, 유아자료실, 꿈나래방',
        sensorInfoString:
          '5층 센서 정보 : 온도, 습도, 소음, 미세먼지, 초미세먼지'
      },
      {
        floorNumber: 4,
        value: '4F',
        facilities: ['작가 집필실', '피아노 연주실'],
        facilityInfoString: '4층 센서 위치 : 작가 집필실, 피아노 연주실',
        sensorInfoString:
          '4층 센서 정보 : 온도, 습도, 소음, 미세먼지, 초미세먼지'
      },
      {
        floorNumber: 3,
        value: '3F',
        facilities: ['마중홀', '세미나홀', '근린상가시설', '작가 집필실'],
        facilityInfoString:
          '3층 센서 위치 : 마중홀 우측 구역, 세미나홀, 근린상가시설, 작가 집필실',
        sensorInfoString:
          '3층 센서 정보 : 온도, 습도, 소음, 미세먼지, 초미세먼지'
      },
      {
        floorNumber: 2,
        value: '2F',
        facilities: [
          '어린이 자료열람실 B',
          '자료 열람실 I',
          '열람석',
          '마중홀'
        ],
        facilityInfoString:
          '2층 센서 위치 : 어린이 자료열람실 B, 자료 열람실 I, 열람석, 마중홀 좌측 구역',
        sensorInfoString:
          '2층 센서 정보 : 온도, 습도, 소음, 미세먼지, 초미세먼지'
      },
      {
        floorNumber: 1,
        value: '1F',
        facilities: [],
        facilityInfoString: '1층 센서 위치 : 설치 된 센서가 없습니다',
        sensorInfoString: '1층 센서 정보 : 설치 된 센서가 없습니다'
      },
      {
        floorNumber: 0,
        value: 'B1',
        facilities: ['어린이 자료열람실 A'],
        facilityInfoString: '지하 1층 센서 위치 : 어린이 자료열람실 A',
        sensorInfoString:
          '지하 1층 센서 정보 : 온도, 습도, 소음, 미세먼지, 초미세먼지'
      }
    ],
    iotDataArray: [
      // noise data set : index 0
      {
        series: [
          {
            name: '주간 소음 평균',
            data: [10, 35, 40, 15, 60, 50]
          },
          {
            name: '설정 기간 소음 평균',
            data: [20, 13, 55, 22, 77, 11]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 400
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '30%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            title: {
              text: '소음(dB)'
            },
            categories: ['B1', 'F2', 'F3', 'F4', 'F5', 'F6']
          },
          yaxis: {
            title: {
              text: 'Floor'
            }
          },
          legend: {
            position: 'top',
            formatter: function(seriesName, opts) {
              return [seriesName, '(dB)']
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + 'dB'
              }
            }
          }
        }
      },
      // park data set : index 1
      {
        series: [
          {
            name: '주차 중',
            data: [22, 5, 16]
          },
          {
            name: '주차 가능',
            data: [96, 45, 34]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 10,
              columnWidth: '30%'
            }
          },
          xaxis: {
            categories: ['F1', 'B1', 'B2'],
            title: {
              text: '차량 수'
            }
          },
          yaxis: {
            title: {
              text: 'Floor'
            }
          },
          legend: {
            position: 'top',
            formatter: function(seriesName, opts) {
              return [seriesName, '(차량 수)']
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + '대'
              }
            }
          },
          fill: {
            // colors: [function ({ value, seriesIndex, w }) {
            //   if (seriesIndex === 0) {
            //     return '#164666'
            //   } else if (seriesIndex === 1) {
            //     return '#556CFF'
            //   } else {
            //     return '#264333'
            //   }
            // }]
          }
        }
      },
      // temp data set : index 2
      {
        series: [
          {
            name: '주간 평균 온도',
            type: 'column',
            data: [20, 25, 22, 26, 23, 24]
          },
          {
            name: '설정 기간 온도 평균',
            type: 'line',
            data: [24, 20, 27, 19, 20, 21]
          }
        ],
        chartOptions: {
          chart: {
            type: 'line'
          },
          stroke: {
            width: [0, 4]
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              columnWidth: '30%'
            }
          },
          xaxis: {
            categories: ['B1', 'F2', 'F3', 'F4', 'F5', 'F6']
          },
          yaxis: [
            {
              title: {
                text: '온도(℃)'
              },
              min: 0,
              max: 40
            },
            {
              opposite: true,
              show: false,
              title: {
                text: '온도(℃)'
              },
              min: 0,
              max: 40
            }
          ],
          tooltip: {
            y: {
              formatter: function (val) {
                return val + '℃'
              }
            }
          }
        }
      },
      // hum data set : index 3
      {
        series: [
          {
            name: '주간 평균 습도',
            type: 'column',
            data: [55, 30, 77, 60, 32, 43]
          },
          {
            name: '설정 기간 습도 평균',
            type: 'line',
            data: [23, 35, 27, 43, 22, 17]
          }
        ],
        chartOptions: {
          chart: {
            type: 'line'
          },
          stroke: {
            width: [0, 4]
          },
          title: {
            text: '습도(%)'
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              columnWidth: '30%'
            }
          },
          xaxis: {
            categories: ['B1', 'F2', 'F3', 'F4', 'F5', 'F6']
          },
          yaxis: [
            {
              title: {
                text: '습도(%)'
              },
              min: 0,
              max: 100
            },
            {
              opposite: true,
              show: false,
              title: {
                text: 'Humidity'
              },
              min: 0,
              max: 100
            }
          ],
          tooltip: {
            y: {
              formatter: function (val) {
                return val + '%'
              }
            }
          }
        }
      },
      // pm10 data set : index 4
      {
        series: [
          {
            name: 'PM10',
            data: [
              {
                x: 'B1',
                y: 30,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F2',
                y: 54,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F3',
                y: 66,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F4',
                y: 81,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F5',
                y: 67,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F6',
                y: 70,
                goals: [
                  {
                    name: '좋음',
                    value: 30,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 80,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 150,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              }
            ]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          colors: [
            function ({ value, seriesIndex, w }) {
              if (value <= 30) {
                return '#4dd64f'
              } else if (value > 30 && value <= 80) {
                return '#ffd248'
              } else {
                return '#ff2d2d'
              }
            }
          ],
          dataLabels: {
            formatter: function (val, opt) {
              const goals =
                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                  .goals
              if (goals && goals.length) {
                return `${val}㎍`
              }
              return val
            }
          },
          fill: {
            opacity: 1
          },
          xaxis: {
            title: {
              text: '미세먼지(㎍)'
            }
          },
          yaxis: {
            title: {
              text: 'Floor'
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + '㎍'
              }
            }
          }
        }
      },
      // pm2.5 data set : index 5
      {
        series: [
          {
            name: 'PM2.5',
            data: [
              {
                x: 'B1',
                y: 50,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F2',
                y: 22,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F3',
                y: 20,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F4',
                y: 17,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F5',
                y: 3,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              },
              {
                x: 'F6',
                y: 6,
                goals: [
                  {
                    name: '좋음',
                    value: 15,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#4dd64f'
                  },
                  {
                    name: '보통',
                    value: 35,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#cfcf48'
                  },
                  {
                    name: '나쁨',
                    value: 75,
                    strokeWidth: 4,
                    strokeDashArray: 1,
                    strokeColor: '#c92a2a'
                  }
                ]
              }
            ]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          colors: [
            function ({ value, seriesIndex, w }) {
              if (value <= 15) {
                return '#4dd64f'
              } else if (value > 15 && value <= 35) {
                return '#ffd248'
              } else {
                return '#ff2d2d'
              }
            }
          ],
          dataLabels: {
            formatter: function (val, opt) {
              const goals =
                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                  .goals
              if (goals && goals.length) {
                return `${val}㎍`
              }
              return val
            }
          },
          fill: {
            opacity: 1
          },
          xaxis: {
            title: {
              text: '초미세먼지(㎍)'
            }
          },
          yaxis: {
            title: {
              text: 'Floor'
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + '㎍'
              }
            }
          }
        }
      }
    ],
    dataChartName: [
      '실내 소음(dB)',
      '주차장',
      '실내 온도(℃)',
      '실내 습도(%)',
      '실내 미세먼지(PM10)',
      '실내 초미세먼지(PM2.5)'
    ]
  },
  getters: {
    // 중복되는 computed 메소드 통합 사용
  },
  mutations: {},
  actions: {},
  modules: {}
})
