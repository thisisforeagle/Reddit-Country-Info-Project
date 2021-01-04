<template>
  <div class="weather p-2 justify-content-center shadow bg-white rounded">
    <div class="card-content" v-if="weatherinfo != null">
      <h3 class="m-0">{{ weatherinfo.name }}, {{ weatherinfo.sys.country }}</h3>
      <p class="weather-info-text">{{ weatherinfo.weather[0].main }}</p>
      <p>
        <strong>Lat/Long: </strong>{{ weatherinfo.coord.lat }},
        {{ weatherinfo.coord.lon }}
      </p>
      <p><strong>Wind speed:</strong> {{ weatherinfo.wind.speed }}mph</p>
      <p><strong>Wind deg:</strong> {{ weatherinfo.wind.deg }}&deg;</p>
      <p><strong>Pressure:</strong> {{ weatherinfo.main.pressure }}</p>
      <p>
        <strong>Timezone:</strong>
        {{ getTimeZoneInfo(weatherinfo.timezone / 3600) }}
      </p>
      <p class="time">
        {{ new Date().toLocaleDateString() }} -
        {{ getCurrentTime(weatherinfo.timezone / 3600) }}
      </p>
      <photos :city="weatherinfo.name" />
    </div>
    <loading v-if="weatherinfo == null" />
  </div>
</template>

<script>
import axios from "axios";
import * as timeago from "timeago.js";

import photos from "./photos.vue";
import loading from "./loading.vue";

export default {
  name: "Weather",
  props: {
    city: String,
  },
  components: {
    loading,
    photos,
  },
  data() {
    return {
      weatherinfo: null,
      apicall: null,
    };
  },
  methods: {
    async getWeather() {
      const weatherresult = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=ea5329773b3f8dfd39ae89496bb7a7d3`
      );
      this.apicall = new Date();
      this.weatherinfo = weatherresult.data;
      setTimeout(() => {
        this.getWeather();
      }, 10000);
    },
    getCurrentTime(offset) {
      const time = new Date();
      const hours = time.getHours();
      const myOffset = time.getTimezoneOffset();

      console.log(offset);

      if (offset > 0) {
        console.log(`${hours}: Adding ${offset} hours from current time`);
        time.setHours(hours - offset);
        console.log(time);
        console.log(new Date(time).toTimeString().split(" ")[0]);
      } else {
        console.log(`${time}: Removing ${offset} hours to current time`);
        time.setHours(hours + offset);
        console.log(hours);
        console.log(new Date(time).toTimeString().split(" ")[0]);
      }

      return new Date(time).toTimeString().split(" ")[0];
    },
    getTimeZoneInfo(offset) {
      if (offset > 0) {
        return `${Math.abs(offset)} hours ahead`;
      } else {
        return `${Math.abs(offset)} hours behind`;
      }
    },
  },
  async mounted() {
    console.log("App mounted", this.city);
    this.getWeather();
  },
};
</script>

<style scoped>
.weather {
  position: relative;
}
.time {
  font-family: "Orbitron", Helvetica, Arial, sans-serif;
}
.weather-info-text {
  font-weight: bold;
  color: #2972a78c;
  font-size: 2em;
}
</style>
