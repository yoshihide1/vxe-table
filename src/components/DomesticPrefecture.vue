<template>
  <CRow>
    <CCol col="12" sm="12">
      <CWidgetBrand
        color="info"
        :rightHeader="prefNowCase"
        :rightFooter="'前日比：' + comparisonCases"
        :leftHeader="' 人口の ' + prefNowPercentage"
        :leftFooter="prefName + 'の人口' + prefPopulation"
        class="w-100 case__small"
      >
        <span class="py-4 header__title">
          <select v-model="selected">
            <option v-for="pref in prefs" :key="pref.code" :value="pref.code">{{ pref.name }}</option>
          </select>
        </span>
        <span class="header__title__sub">(現在)</span>
      </CWidgetBrand>
    </CCol>
  </CRow>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import prefs from "../assets/prefectures.json";
export default {
  data() {
    return {
      prefs: prefs,
      selected: 13,
      prefNowCase: "",
      prefNowPercentage: 0,
      prefPopulation: 0,
      prefName: "",
      comparisonCases: 0,
    };
  },
  computed: {
    ...mapState(["allCoronaData", "prefData"]),
    ...mapGetters(["prefDataFilter", "numComma", "comparison"]),
  },
  watch: {
    selected() {
      this.$store.commit("newPrefTotal", this.prefDataFilter(this.selected));
      this.$store.dispatch("byPrefecture", this.selected);
    },
    allCoronaData() {
      this.$store.commit("newPrefTotal", this.prefDataFilter(this.selected));
      this.$store.dispatch("byPrefecture", this.selected);
    },
    prefData() {
      this.prefFilter(this.prefData);
      this.comparisonCases = this.comparison(this.prefData, "cases");
    },
  },
  methods: {
    prefFilter(pref) {
      console.log(pref);
      let now =
        pref["cases"].today -
        pref["discharge"].today -
        (pref["deaths"].today - pref["deaths"].yesterday);
      let percentage = (now / pref["population"].today) * 100;
      this.prefNowCase = this.numComma(now);
      this.prefNowPercentage = Math.floor(percentage * 100000) / 100000 + "%";
      this.prefName = pref["prefecture"];
      this.prefPopulation = this.numComma(pref["population"].today);
    },
  },
};
</script>

<style>
</style>