<template>
  <div class="card">
    <div class="card__title">
      <p>累計</p>
    </div>
    <div class="card__body">
      <p>
        <span class="card__font__span">PCR検査</span>
        ：{{ pcr }}
        <span class="card__font__span">人</span>
        <span class="card__font__comparison">(前日比:+{{ comparisonPcr }})</span>
      </p>
      <p>
        <span class="card__font__span">感染者</span>
        ：{{ cases }}
        <span class="card__font__span">人</span>
        <span class="card__font__comparison">(前日比:+{{ comparisonCases }})</span>
      </p>
      <p>
        <span class="card__font__span">死者</span>
        ：{{ deaths }}
        <span class="card__font__span">人</span>
        <span class="card__font__comparison">(前日比:+{{ comparisonDeaths }})</span>
      </p>
      <p class="death">
        <span class="card__font__span">致死率</span>
        {{ deathPercentage }}%
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      pcr: 0,
      cases: 0,
      deaths: 0,
      deathPercentage: 0,
      comparisonPcr: 0
    };
  },
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["numComma"])
  },
  watch: {
    ratio() {
      this.cumulative(this.ratio[0]);
      this.percentage(this.ratio[0]);
      this.comparison(this.ratio[0], this.ratio[1]);
    }
  },
  methods: {
    cumulative(ratio) {
      this.pcr = this.numComma(ratio.pcr);
      this.cases = this.numComma(ratio.cases);
      this.deaths = this.numComma(ratio.deaths);
    },
    percentage(ratio) {
      let death = (ratio.deaths / ratio.cases) * 100;
      this.deathPercentage = Math.floor(death * 100) / 100;
    },
    comparison(today, yesterday) {
      this.comparisonPcr = today.pcr - yesterday.pcr;
      this.comparisonCases = today.cases - yesterday.cases;
      this.comparisonDeaths = today.deaths - yesterday.deaths;
    }
  }
};
</script>

<style>
</style>