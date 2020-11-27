<template>
  <div>
    <p>{{ time }}</p>
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
p {
  font-family: "Orbitron", Helvetica, Arial, sans-serif;
}
</style>