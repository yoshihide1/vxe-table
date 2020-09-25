<template>
  <CRow>
    <CCol col="12" sm="4">
      <CWidgetBrand
        color="info"
        :rightHeader="comparisonCases"
        :rightFooter="cases"
        :leftHeader="comparisonPcr"
        :leftFooter="pcr"
        class="w-100 case font__symbol__h"
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
        :rightFooter="'死者' + ':' +deathPercentage"
        :leftHeader="comparisonDeaths"
        leftFooter="前日比"
        class="w-100 death__plus font__symbol__h"
        ref="death"
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
        class="w-100 font__symbol__cumulative"
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
    ...mapGetters(["numComma", "numCheck"]),
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
      this.pcr = `(${this.numComma(ratio.pcr)}人)`;
      this.cases = `(${this.numComma(ratio.cases)}人)`;
      this.deaths = this.numComma(ratio.deaths);
    },
    percentage(ratio) {
      const death = (ratio.deaths / ratio.cases) * 100;
      const pcr = (ratio.pcr / ratio.population) * 100;
      const cases = (ratio.cases / ratio.population) * 100;
      this.pcrPercentage = String(Math.floor(pcr * 10000) / 10000);
      this.casesPercentage = String(Math.floor(cases * 10000) / 10000);
      this.deathPercentage = Math.floor(death * 100) / 100 + "%";
    },
    comparison(today, yesterday) {
      this.comparisonPcr = `+${this.numComma(today.pcr - yesterday.pcr)}`;
      this.comparisonCases = `+${this.numComma(today.cases - yesterday.cases)}`;
      const num = today.deaths - yesterday.deaths;
      if (num > 0) {
        this.comparisonDeaths = `+${num}`;
      } else {
        this.comparisonDeaths = `±${num}`;
        const d = this.$refs.death.$el;
        d.classList.replace("death__plus", "death");//testに引っかかる
      }
    },
  },
};
</script>

<style>
.font__unit {
  font-size: 0.7rem;
}
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
.death__plus .col:nth-child(3) .text-value-lg {
  color: #ff1e1e;
}
.death .col:nth-child(3) .text-value-lg {
  color: blue;
}
.font__symbol__cumulative .col:nth-child(1) .text-value-lg::after {
  content: "%";
  font-size: 0.8rem;
}
.font__symbol__cumulative .col:nth-child(3) .text-value-lg::after {
  content: "%";
  font-size: 0.8rem;
}
.font__symbol__h .col:nth-child(1) .text-value-lg::after {
  content: "人";
  font-size: 0.8rem;
  color: black;
}
.font__symbol__h .col:nth-child(3) .text-value-lg::after {
  content: "人";
  font-size: 0.8rem;
  color: black;
}
</style>