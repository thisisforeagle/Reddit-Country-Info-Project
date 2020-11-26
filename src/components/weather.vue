<template>
  <div class="weather" v-if="weatherinfo != null">
    <h3>{{ weatherinfo.name }}, {{ weatherinfo.sys.country }}</h3>
    <p>{{ weatherinfo.coord.lat }}, {{ weatherinfo.coord.lon }}</p>
    <p><strong>Wind speed:</strong> {{ weatherinfo.wind.speed }}mph</p>
    <p><strong>Wind deg:</strong> {{ weatherinfo.wind.deg }}&deg;</p>
    <p><strong>Pressure:</strong> {{ weatherinfo.main.pressure }}</p>
    <p>Timezone: {{ weatherinfo.timezone / 3600 }}</p>
    <p>Time: {{ getCurrentTime(weatherinfo.timezone / 3600) }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Weather",
  props: {
    city: String,
  },
  data() {
    return {
      weatherinfo: null,
    };
  },
  methods: {
    async getWeather() {
      const weatherresult = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=61b273007b56bd2f3833c35aaaa7da34`
      );
      this.weatherinfo = weatherresult.data;
    },
    getCurrentTime(offset) {
      const time = new Date();
      const hours = time.getHours();

      offset > 0
        ? time.setHours(hours - offset)
        : time.setHours(hours - offset);

      return new Date(time);
    },
  },
  async mounted() {
    this.getWeather();
  },
};
</script>

<style scoped>
</style>
