<template>
  <!-- dark mode : bg-dark text-white -->
  <div id="app">
    <!-- white mode : autohide navbar navbar-expand-sm bg-light -->
    <!-- dark mode : autohide navbar navbar-dark navbar-expand-sm bg-dark -->
    <nav class="autohide navbar navbar-expand-sm bg-light">
      <div class="container-fluid ms-3">
        <a
          class="navbar-brand"
          @click="goToHome"
          style="font-weight: bold; cursor: pointer"
        >
          Lab0104
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-1" id="navbarSupportedContent">
          <ul
            class="navbar-nav me-auto mb-2 mb-sm-0"
            style="text-align: center; font-weight: bold"
          >
            <li class="nav-item me-2">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item me-2">
              <a
                @click="goToInner"
                class="nav-link"
                to="/inner"
                style="cursor: pointer"
              >
                실내데이터
              </a>
            </li>
            <li class="nav-item me-2">
              <router-link class="nav-link" to="/statistic">
                통계데이터
              </router-link>
            </li>
            <li class="nav-item me-2">
              <router-link class="nav-link" @click="goToDetail()" to="/detail">
                상세데이터
              </router-link>
            </li>
            <li class="nav-item me-2">
              <router-link class="nav-link" @click="goToDB()" to="/air">
                DB 관리페이지
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--  -->
    <router-view />
    <!--  -->
    <footer>
      <div class="d-flex flex-column py-4 mt-4 border-top">
        <span class="align-self-center">
          © 2022 Kangnam, Univ. Team Lab0104 All rights reserved.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ path: '/' })
    },
    goToInner() {
      this.$router.push({
        path: '/inner',
        query: { floor: 1 } // default 값을 임의로 1층으로 지정
      })
    },
    goToStatistic() {
      this.$router.push({ path: '/statistic' })
    },
    goToDetail() {
      this.$router.push({
        path: '/detail',
        query: { dataType: 0 }
      })
    },
    goToDB() {
      this.$router.push({ path: '/air' })
    }
  }
}
</script>

<style>
#app {
  min-width: 375px;
}
.scrolled-down {
  transform: translateY(-100%);
  transition: all 0.3s ease-in-out;
}
.scrolled-up {
  transform: translateY(0);
  transition: all 0.3s ease-in-out;
}
.selector-for-some-widget {
  box-sizing: content-box;
}
</style>
