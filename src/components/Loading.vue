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
 position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

</style>