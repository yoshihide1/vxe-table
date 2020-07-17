<template>
  <div>
    <div class="card">
      <div class="card__title">
        <p>
          人口に対する割合
          <span class="card__font__span">(累計)</span>
        </p>
      </div>
      <div class="card__body">
        <p>
          <span class="card__font__span">PCR検査</span>
          ：{{ pcrPercentage }}
          <span class="card__font__span">％</span>
        </p>
        <p>
          <span class="card__font__span">感染者</span>
          ：{{ casesPercentage }}
          <span class="card__font__span">％</span>
        </p>
        <p>
          <span class="card__font__span">国内の人口:{{ population }}人</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      pcrPercentage: 0,
      casesPercentage: 0,
      population: 0
    };
  },
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["numComma"])
  },
  watch: {
    ratio() {
      this.percentage(this.ratio[0]);
      this.population = this.numComma(this.ratio[0].population);
    }
  },
  methods: {
    percentage(ratio) {
      let pcr = (ratio.pcr / ratio.population) * 100;
      let cases = (ratio.cases / ratio.population) * 100;
      this.pcrPercentage = Math.floor(pcr * 10000) / 10000;
      this.casesPercentage = Math.floor(cases * 10000) / 10000;
    }
  }
};
</script>

<style>
</style>