<template>
  <div id="app">
    <Corona />
  </div>
</template>
<script>
import Corona from "./views/Corona"
export default {
  components: {
    Corona
  },
    mounted() {
    console.log("mounted!!!")
  },

}
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
