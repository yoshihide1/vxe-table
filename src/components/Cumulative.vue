<template>
  <CRow>
    <CCol col="12" sm="4">
      <CWidgetBrand
        color="info"
        :rightHeader="comparisonCases"
        :rightFooter="cases"
        :leftHeader="comparisonPcr"
        :leftFooter="pcr"
        class="w-100 case"
      >
        <div class="col py-3">
          <p>
            <span class="header__title">感染者</span>
          </p>
          <p>
            <span class="header__title__sub">(累計)</span>
          </p>
        </div>
        <div class="col">
          <p>
            <span class="header__title">PCR検査</span>
          </p>
          <p>
            <span class="header__title__sub">(累計)</span>
          </p>
        </div>
      </CWidgetBrand>
    </CCol>
    <CCol col="12" sm="4">
      <CWidgetBrand
        color="info"
        :rightHeader="deaths"
        rightFooter="死者"
        :leftHeader="comparisonDeaths"
        leftFooter="前日比"
        class="w-100 death"
      >
        <div class="col py-3">
          <p>
            <span class="header__title">死者</span>
          </p>
          <p>
            <span class="header__title__sub">(累計)</span>
          </p>
        </div>
      </CWidgetBrand>
    </CCol>
    <CCol col="12" sm="4">
      <CWidgetBrand
        color="info"
        :right-header="casesPercentage"
        right-footer="感染者"
        :left-header="pcrPercentage"
        left-footer="PCR検査"
        class="w-100"
      >
        <div class="col py-3">
          <p>
            <span class="header__title">人口に対する割合</span>
          </p>
          <p>
            <span class="header__title__sub">(累計)</span>
          </p>
        </div>
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
      comparisonDeaths: "",
    };
  },
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["numComma"]),
    datasetsPie() {
      return [
        {
          data: [this.comparisonCases, this.comparisonPcr],
          borderWidth: 1,
          backgroundColor: ["#ff1e1e", "blue"],
          label: "感染者",
        },
      ];
    },
    options() {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      };
    },
  },
  watch: {
    ratio() {
      this.cumulative(this.ratio[0]);
      this.percentage(this.ratio[0]);
      this.comparison(this.ratio[0], this.ratio[1]);
    },
  },
  methods: {
    cumulative(ratio) {
      this.pcr = `(${this.numComma(ratio.pcr)})`;
      this.cases = `(${this.numComma(ratio.cases)})`;
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
      this.comparisonPcr = `+${this.numComma(today.pcr - yesterday.pcr)}`;
      this.comparisonCases = `+${this.numComma(today.cases - yesterday.cases)}`;
      this.comparisonDeaths = `+${today.deaths - yesterday.deaths}`;
    },
  },
};
</script>

<style>
.header__title {
  font-size: 1.1rem;
}
.header__title__sub {
  font-size: 0.8rem;
}
.case .col:nth-child(1) .text-value-lg {
  color: #ff1e1e;
}
.case .col:nth-child(3) .text-value-lg {
  color: blue;
}
.death .col:nth-child(3) .text-value-lg {
  color: #ff1e1e;
}
</style>