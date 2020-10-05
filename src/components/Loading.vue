<template>
  <div class="loading">
    <CSpinner
      class="set__center"
      style="width: 4rem; height: 4rem"
      color="danger"
      grow
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  position: relative;
  height: 50vw;
}
.set__center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>