<template>
  <CRow>
    <CCol col="12" sm="3">
      <CWidgetBrand
        color="dark"
        :rightHeader="cases"
        rightFooter="感染者"
        :leftHeader="comparisonCases"
        leftFooter="前日比"
        class="w-100"
      >
        <CIcon name="cilSettings" />
        <span class="py-4 header__title">
          感染者
          <span class="header__title__sub">(累計)</span>
        </span>
      </CWidgetBrand>
    </CCol>
    <CCol col="12" sm="3">
      <CWidgetBrand
        color="primary"
        :rightHeader="pcr"
        rightFooter="PCR検査"
        :leftHeader="comparisonPcr"
        leftFooter="前日比"
        class="w-100"
      >
        <span class="py-4 header__title">
          PCR検査
          <span class="header__title__sub">(累計)</span>
        </span>
      </CWidgetBrand>
    </CCol>
    <CCol col="12" sm="3">
      <CWidgetBrand
        color="danger"
        :rightHeader="deaths"
        rightFooter="死者"
        :leftHeader="comparisonDeaths"
        leftFooter="前日比"
        class="w-100"
      >
        <span class="py-4 header__title">
          死者
          <span class="header__title__sub">(累計)</span>
        </span>
      </CWidgetBrand>
    </CCol>
    <CCol col="12" sm="3">
      <CWidgetBrand
        color="success"
        :right-header="casesPercentage"
        right-footer="感染者"
        :left-header="pcrPercentage"
        left-footer="PCR検査"
        class="w-100"
      >
        <span class="py-4 header__title">
          人口に対する割合
          <span class="header__title__sub">(累計)</span>
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
      pcr: "",
      cases: "",
      deaths: "",
      deathPercentage: "",
      pcrPercentage: "",
      casesPercentage: "",
      population: "",
      comparisonPcr: "",
      comparisonCases: "",
      comparisonDeaths: ""
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
      let pcr = (ratio.pcr / ratio.population) * 100;
      let cases = (ratio.cases / ratio.population) * 100;
      this.pcrPercentage = Math.floor(pcr * 10000) / 10000 + "%";
      this.casesPercentage = Math.floor(cases * 10000) / 10000 + "%";
      this.deathPercentage = Math.floor(death * 100) / 100 + "%";
    },
    comparison(today, yesterday) {
      this.comparisonPcr = `+${today.pcr - yesterday.pcr}`;
      this.comparisonCases = `+${today.cases - yesterday.cases}`;
      this.comparisonDeaths = `+${today.deaths - yesterday.deaths}`;
    }
  }
};
</script>

<style>
.header__title {
  font-size: 1.3rem;
}
.header__title__sub {
  font-size: 0.8rem;
}
</style>