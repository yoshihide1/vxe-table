<template>
  <CRow>
    <CCol col="12" sm="12">
      <CWidgetBrand
        color="info"
        :rightHeader="nowCase"
        :rightFooter="'前日比：' + comparisonCases + '※感染者ー退院者'"
        :leftHeader="nowPercentage"
        :leftFooter="'国内の人口:' + population + '人'"
        class="w-100 case__plus font__symbol__domestic"
        ref="case"
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
      nowCase: "",
      nowPercentage: "",
      population: 0,
      comparisonCases: 0,
    };
  },
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["numComma", "numCheck"]),
  },
  watch: {
    ratio() {
      this.now(this.ratio[0], this.ratio[1]);
      this.population = this.numComma(this.ratio[0].population);
    },
  },
  methods: {
    now(today, yesterday) {
      let a = today.cases - today.discharge - today.deaths;
      let b = yesterday.cases - yesterday.discharge - yesterday.deaths;
      let percentage = (a / today.population) * 100;
      this.nowCase = this.numComma(a);
      this.nowPercentage = String(Math.floor(percentage * 100000) / 100000);
      if (a - b >= 0) {
        this.comparisonCases = `+${a - b}人`;
      } else {
        this.comparisonCases = `${a - b}人`;
        let d = this.$refs.case.$el;
        d.classList.replace("case__plus", "case__minus");
      }
    },
  },
};
</script>

<style>
.case__plus .col:nth-child(1) .text-uppercase {
  color: red !important;
}
.case__minus .col:nth-child(1) .text-uppercase {
  color: blue !important;
}
.font__symbol__domestic .col:nth-child(1) .text-value-lg::after {
  content: "人";
  font-size: 0.8rem;
}
.font__symbol__domestic .col:nth-child(3) .text-value-lg::after {
  content: "%";
  font-size: 0.8rem;
}
</style>