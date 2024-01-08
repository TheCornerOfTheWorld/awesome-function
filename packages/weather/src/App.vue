<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  data() {
    return {
      localTime: "00:00",
      weatherData: {},
    };
  },
  mounted() {
    setInterval(() => {
      this.localTime = new Date().toLocaleTimeString();
    }, 1000);

    this.initAMap();
  },
  methods: {
    async initAMap() {
      const that = this;
      const AMap = await AMapLoader.load({
        key: "f588246e12e2df52b1ce8cd88bda24b8",
        version: "2.0",
        plugins: ["AMap.CitySearch"],
      });
      console.log("🚀 ~ file: App.vue:25 ~ initAMap ~ AMap:", AMap);

      AMap.plugin("AMap.CitySearch", function () {
        const citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            console.log(result.city);
            AMap.plugin("AMap.Weather", () => {
              const weather = new AMap.Weather();
              weather.getLive(result.city, (err, data) => {
                console.log(err, data);
                that.weatherData = data;
              });
            });
          }
        });
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="nav">
      <div class="time">{{ localTime }}</div>
      <div class="city">切换城市</div>
    </div>
    {{ res }}
    <div class="city-info">
      <div class="city-name">{{ weatherData.city }}</div>
      <p class="weather">{{ weatherData.weather }}</p>
      <h2 class="temp">
        <em>{{ weatherData.temperature }}</em
        >℃
      </h2>
      <div class="detail">
        <span>风力：{{ weatherData.windPower }}级</span> |
        <span>风向：{{ weatherData.windDirection }}</span> |
        <span>空气湿度：{{ weatherData.humidity }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  min-height: 100vh;
  background-color: #000;
  opacity: 0.6;
  color: #fff;
}

.nav {
  overflow: auto;
  padding: 10px;
}

.time {
  float: left;
}

.city {
  float: right;
}

.city-info {
  text-align: center;
}

.temp {
  font-size: 26px;
}

.temp em {
  font-style: normal;
  font-size: 34px;
}
</style>
