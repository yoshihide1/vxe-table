<template>
  <div class="card">
    <div class="card__title">
      <p>
        <select v-model="selected">
          <option v-for="pref in prefs" :key="pref.code" :value="pref.code">{{ pref.name }}</option>
        </select>
        <span class="card__font__span">(現在)</span>
      </p>
    </div>
    <div class="card__body">
      <p>
        <span class="card__font__span">感染者</span>
        ：{{ numComma(prefNowCase) }}
        <span class="card__font__span">人</span>
      </p>
      <p>
        <span class="card__font__span">{{ prefName }}人口の</span>
        {{ prefNowPercentage }}%
      </p>
      <p>
        <span class="card__font__span">{{ prefName }}の人口:{{ prefPopulation }}人</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import prefs from "../assets/prefectures.json";
export default {
  data() {
    return {
      prefs: prefs,
      selected: 13,
      cases: 0,
      prefNowCase: 0,
      prefNowPercentage: 0,
      prefPopulation: 0,
      prefName: ""
    };
  },
  computed: {
    ...mapState(["newCoronaData", "oldCoronaData", "newPrefData"]),
    ...mapGetters(["newPrefFilter", "oldPrefFilter", "numComma"])
  },
  watch: {
    selected() {
      this.$store.commit("newPrefTotal", this.newPrefFilter(this.selected));
      this.$store.commit("oldPrefTotal", this.oldPrefFilter(this.selected));
    },
    newCoronaData() {
      this.$store.commit("newPrefTotal", this.newPrefFilter(this.selected));
    },
    oldCoronaData() {
      this.$store.commit("oldPrefTotal", this.oldPrefFilter(this.selected));
    },
    newPrefData() {
      this.prefFilter(this.newPrefData);
    }
  },
  methods: {
    prefFilter(pref) {
      let now = pref.cases - pref.discharge - pref.deaths;
      let percentage = (now / pref.population) * 100;
      this.prefNowCase = now;
      this.prefNowPercentage = Math.floor(percentage * 100000) / 100000;
      this.prefName = pref.prefecture;
      this.prefPopulation = this.numComma(pref.population);
    }
  }
};
</script>

<style>
</style>