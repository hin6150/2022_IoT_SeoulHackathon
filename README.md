<h1>2022년 서울시 IoT 공공데이터 활용 해커톤</h1>
<p>상세 정보: <span>http://seoulhackathon.kr/</span></p>

<h2>아이디어 개요</h2>
<p>ICT 산업의 발전과 함께 서울시에서는 다양한 데이터를 센서를 통해 수집하고 있습니다.</p>
<p>이러한 데이터들을 시민들의 필요에 맞추어 제공하고 데이터 시각화를 통해 시설 유지보수에 도움을 주고자 합니다.</p>
<p>저희 서비스는 마포구 중안 도서관의 공공 데이터를 가져와 각 층의 시설별 공기질 데이터와 방문자, 주차장 정보를 도서관 사용자와 관리자에게 제공합니다.</p>

<h2>서비스 기대효과</h2>
<ol>
<li>대형 시설의 구역별 데이터를 통해 적은 인력으로도 효율적인 관리가 가능합니다.<br> -> 이를 통해 고령화 사회 문제 해결을 바라봅니다.</li>
<li>주차장 평균 주차 데이터를 통해 공유 주차서비스로 연계하고자 합니다. <br> -> 남는 주차공간을 유동적으로 사용해 불법주차 문제 해결하고자 합니다.</li>
</ol>

<h2>마포구 중앙도서관 공공 데이터</h2>
<ul>
  <li>주차장 정보 : http://data.seoul.go.kr/dataList/OA-15980/S/1/datasetView.do</li>
  <li>방문자 정보 : http://data.seoul.go.kr/dataList/OA-15979/S/1/datasetView.do</li>
  <li>공기질 정보 : http://data.seoul.go.kr/dataList/OA-15978/S/1/datasetView.do</li>
</ul>


<h4>팀명: LAB0104</h4>

<h4>개발환경: Vue3.js</h4>

<p>1차 개발기한(해커톤 발전상): 07월 15일 ~ 08월 27일</p>
<p>2차 개발기한(학술제 장려상): 10월 21일 ~ 11월 18일</p>

<h2>동작 화면</h2>

https://github.com/hin6150/2022_IoT_SeoulHackathon/assets/3265750/e5fe9543-c4e2-4292-9ce4-6b19f54ccaa6

<h2>프로젝트 중 맡은 부분</h2>
<p>마포구 중앙 도서관 층별 안내도를 가져와 해당 시설에 대한 반응형 이미지 맵을 구현하고, 실제 공기질 정보를 가져와 표기하는 작업을 진행 했습니다.</p>


<p>반응형 이미지 맵이므로, 이미지 맵의 위치정보를 화면 크기에 따라 계산해 층별 안내도의 크기가 달라짐에도, 올바르게 시설과 상호작용이 가능하도록 구현하였습니다.</p>
<p>또한, Back-End에서 데이터를 제공해주는 작업이 늦어짐에 Node.js와 Express를 이용해 로컬 서버를 구성하여 실제 데이터를 먼저 받아서 작업 할 수 있도록 하였습니다.</p>
