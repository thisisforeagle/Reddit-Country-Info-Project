<template>
  <div class="container" id="app">
    <div class="add-block">
      <svg
        viewBox="0 0 16 16"
        class="bi bi-cloud-plus add-icon"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        @click="addCity()"
      >
        <path
          fill-rule="evenodd"
          d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
        />
        <path
          fill-rule="evenodd"
          d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
        />
      </svg>
    </div>
    <local-time />
    <div class="masonry">
      <div class="city" v-for="city in cities" :key="city.name">
        <weather :city="city.name" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

import weather from "./components/weather.vue";
import localTime from "./components/local-time.vue";

export default {
  name: "App",
  components: {
    weather,
    localTime,
  },
  data() {
    return {
      cities: [],
    };
  },
  watch: {},
  methods: {
    async addCity() {
      const city = await Swal.fire({
        title: "Add a city",
        input: "select",
        inputOptions: {
          "New York": "New York",
          Amsterdam: "Amsterdam",
          "Los Angeles": "Los Angeles",
        },
        inputPlaceholder: "Select a city",
      });
      console.log(city);
      this.cities.push({
        name: city.value,
        images: [],
      });
    },
  },
  mounted() {
    this.viewerTZoffset = new Date().getTimezoneOffset();
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.masonry {
  display: flex;
  flex-flow: row wrap;
  margin-left: -8px; /* Adjustment for the gutter */
  width: 100%;
}
.city {
  flex: auto;
  min-height: 445px;
  min-width: 150px;
  margin: 0 8px 8px 0; /* Some gutter */
}
.add-block .add-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
}
@import "~bootstrap/scss/bootstrap";
</style>
