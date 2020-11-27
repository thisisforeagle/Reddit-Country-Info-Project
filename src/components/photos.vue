<template>
  <div>
    <div v-for="photo in photos" :key="photo.image.web">
      <img :src="photo.image.web" class="city-photo shadow" />
    </div>
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
        const photosresults = await axios.get(
          `https://api.teleport.org/api/urban_areas/slug:${this.cityname}/images/`
        );
        this.photos = photosresults.data.photos;
        console.log(this.photos);
      }
    },
  },
  mounted() {
    this.getPhotos();
  },
};
</script>
<style lang="scss">
.city-photo {
  max-width: 400px;
}
</style>