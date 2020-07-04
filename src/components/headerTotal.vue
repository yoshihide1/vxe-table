<template>
  <div id="total">
    <p>
      PCR検査：{{ coronaTotalData.pcr }}
      <span class="total__font__span">人</span>
    </p>
    <p>
      感染者：{{ coronaTotalData.cases }}
      <span class="total__font__span">人</span>
    </p>
    <p>
      人口：{{ coronaTotalData.population}}
      <span class="total__font__span">人</span>
    </p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["coronaTotalData"])
  }
};
</script>
<style>
#total {
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
}
.total__font__span {
  font-size: 1rem;
}
</style>