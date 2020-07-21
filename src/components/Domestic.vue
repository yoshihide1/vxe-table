<template>
  <CRow>
    <CCol col="12" sm="6">
      <CWidgetBrand
        color="facebook"
        :rightHeader="nowCase"
        :rightFooter="'前日比：' + comparisonCases + '※感染者ー退院者'"
        :leftHeader="nowPercentage + '%'"
        :leftFooter="'国内の人口:' + population + '人'"
        class="w-100"
      >
        <span class="py-4 header__title">
          感染者
          <span class="header__title__sub">(現在)</span>
        </span>
      </CWidgetBrand>
    </CCol>
  </CRow>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      nowCase: 0,
      nowPercentage: 0,
      population: 0,
      comparisonCases: 0
    };
  },
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["numComma"])
  },
  watch: {
    ratio() {
      this.now(this.ratio[0], this.ratio[1]);
      this.population = this.numComma(this.ratio[0].population);
    }
  },
  methods: {
    now(today, yesterday) {
      let a = today.cases - today.discharge - today.deaths;
      let b = yesterday.cases - yesterday.discharge - yesterday.deaths;
      let percentage = (a / today.population) * 100;
      this.nowCase = this.numComma(a);
      this.nowPercentage = Math.floor(percentage * 100000) / 100000;
      if (a - b >= 0) {
        this.comparisonCases = `+${a - b}`;
      } else {
        this.comparisonCases = `-${a - b}`;
      }
    }
  }
};
</script>

<style>
</style>