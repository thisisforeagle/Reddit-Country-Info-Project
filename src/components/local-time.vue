<template>
  <div>
    <p>Local Time: {{ time }}</p>
  </div>
</template>
<script>
export default {
  name: "Local-Time",
  props: {},
  data() {
    return {
      time: null,
    };
  },
  methods: {
    getTime() {
      setTimeout(() => {
        this.time = new Date().toLocaleTimeString();
        this.getTime();
      }, 1000);
    },
  },
  mounted() {
    this.getTime();
  },
};
</script>
<style scoped>
</style>