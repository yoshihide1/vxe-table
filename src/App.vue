<template>
  <div id="app">
    <Loading v-show="loading" />
    <Corona v-show="!loading" />
  </div>
</template>
<script>
import Corona from "./views/Corona";
import Loading from "./components/Loading";
export default {
  components: {
    Corona,
    Loading,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
      this.loading = false;
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
