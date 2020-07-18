<template>
    <div class="card">
      <div class="card__title">
        <p>
          日本国内
          <span class="card__font__span">(現在)</span>
        </p>
      </div>
      <div class="card__body">
        <p>
          <span class="card__font__span">感染者</span>
          ：{{ nowCase }}
          <span class="card__font__span">人</span>
        </p>
        <p>
          <span class="card__font__span">国内人口の</span>
          {{ nowPercentage }}%
        </p>
        <p>
          <span class="card__font__span">国内の人口:{{ population }}人</span>
        </p>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      nowCase: 0,
      nowPercentage: 0,
      population: 0
    };
  },
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["numComma"])
  },
  watch: {
    ratio() {
      this.now(this.ratio[0]);
      this.population = this.numComma(this.ratio[0].population);
    }
  },
  methods: {
    now(nowData) {
      let now = nowData.cases - nowData.discharge - nowData.deaths;
      let percentage = (now / nowData.population) * 100;
      this.nowCase = this.numComma(now);
      this.nowPercentage = Math.floor(percentage * 100000) / 100000;
    }
  }
};
</script>

<style>
</style>