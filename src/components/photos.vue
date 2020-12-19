<template>
  <div class="row photo-row">
    <div
      v-for="photo in photos"
      class="col-sm-12 col-md-4 image-column"
      :style="getBackground(photo)"
      :key="photo.id"
      @click="openLarge(photo)"
    ></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Photos",
  props: {
    city: String,
  },
  components: {},
  data() {
    return {
      photos: null,
    };
  },
  computed: {
    cityname() {
      let toBeParsed = this.city;

      toBeParsed = toBeParsed.toLowerCase();
      toBeParsed = toBeParsed.replace(/[^a-zA-Z0-9 ]+/g, "");
      toBeParsed = toBeParsed.replace(/\s+/g, "-");

      console.log(toBeParsed);

      return toBeParsed;
    },
  },
  methods: {
    async getPhotos() {
      if (this.city) {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: this.city,
              page: 1,
              per_page: 3,
            },
            headers: {
              Authorization:
                "Client-ID ucvbxVkG-EnneTVLMBbsLUQaz-MN8IVT3oGOB_uUUeI",
            },
          }
        );
        this.photos = response.data.results;
        console.log(this.photos);
      }
    },
    openLarge(photo) {
      window.open(photo.urls.full);
    },
    getBackground(photo) {
      return `background-image: url(${photo.urls.small})`;
    },
  },
  mounted() {
    this.getPhotos();
  },
};
</script>
<style lang="scss">
.image-column {
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.photo-row {
  max-width: 100%;
  margin: 0 auto;
}
</style>