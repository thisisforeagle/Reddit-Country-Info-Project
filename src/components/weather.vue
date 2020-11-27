<template>
  <div class="weather p-2 justify-content-center shadow bg-white rounded">
    <div class="card-content" v-if="weatherinfo != null">
      <h3 class="m-0">{{ weatherinfo.name }}, {{ weatherinfo.sys.country }}</h3>
      <p>{{ weatherinfo.weather[0].main }}</p>
      <p>{{ weatherinfo.coord.lat }}, {{ weatherinfo.coord.lon }}</p>
      <p><strong>Wind speed:</strong> {{ weatherinfo.wind.speed }}mph</p>
      <p><strong>Wind deg:</strong> {{ weatherinfo.wind.deg }}&deg;</p>
      <p><strong>Pressure:</strong> {{ weatherinfo.main.pressure }}</p>
      <p><strong>Timezone:</strong> {{ weatherinfo.timezone / 3600 }}</p>
      <p class="time">
        {{ getCurrentTime(weatherinfo.timezone / 3600) }}
      </p>
      <p class="updated">Last updated: {{ lastupdated }}</p>
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
      lastupdated: null,
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

      offset > 0
        ? time.setHours(hours - offset)
        : time.setHours(hours - offset);

      return new Date(time).toLocaleTimeString();
    },
    updated() {
      if (this.apicall) {
        this.lastupdated = timeago.format(this.apicall);
        console.log(this.lastupdated);
        setTimeout(() => {
          this.updated();
        }, 1000);
      } else {
        console.log(this.lastupdated);
        this.lastupdated = "never";
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
.updated {
  font-size: 0.6em;
  color: #adb5bd;
}
</style>
