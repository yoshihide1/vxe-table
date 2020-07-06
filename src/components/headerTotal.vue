<template>
  <div id="container">
    <div id="death">
      <p>致死率</p>
      <p>{{ deathPercentage }}%</p>
    </div>
    <div id="total">
      <p>累計</p>
      <p>
        PCR検査：{{ numComma(coronaTotalData.pcr) }}
        <span class="total__font__span">人</span>
      </p>
      <p>
        感染者：{{ numComma(coronaTotalData.cases) }}
        <span class="total__font__span">人</span>
      </p>
      <p>
        死者：{{ numComma(coronaTotalData.deaths) }}
        <span class="total__font__span">人</span>
      </p>
    </div>
    <div id="percentage">
      <p>人口に対する割合</p>
      <p>
        PCR検査：{{ pcrPercentage }}
        <span class="total__font__span">％</span>
      </p>
      <p>
        感染者：{{ casesPercentage }}
        <span class="total__font__span">％</span>
      </p>
    </div>
    <div class="title__now">
      <p>{{ updated }}</p>
    </div>
    <div id="total__now">
      <div>
        <p class="total__now">日本国内</p>
        <p class="total__now">
          <span class="total__person">国内人口:{{ numComma(coronaTotalData.population) }}人</span>
        </p>
        <p>
          感染者：{{ numComma(nowCase) }}
          <span class="total__font__span">人</span>
        </p>
        <p>
          <span class="total__person">国内人口の</span>
          {{ nowPercentage }}%
        </p>
      </div>
      <div>
        <select v-model="selected">
          <option v-for="pref in prefs" :key="pref.code" :value="pref.code">{{ pref.name }}</option>
        </select>
      </div>
      <div>
        <p class="total__now">{{ prefName }}</p>
        <p class="total__now">
          <span class="total__person">{{ prefName }}の人口:{{ numComma(coronaPrefData.population) }}人</span>
        </p>
        <p>
          感染者：{{ numComma(prefNowCase) }}
          <span class="total__font__span">人</span>
        </p>
        <p>
          <span class="total__person">{{ prefName }}人口の</span>
          {{ prefNowPercentage }}%
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import prefs from "../assets/prefectures.json";
export default {
  computed: {
    ...mapState(["coronaTotalData", "coronaPrefData"]),
    ...mapGetters(["prefDataFilter"])
  },
  data() {
    return {
      prefs: prefs,
      selected: 13,
      pcrPercentage: 0,
      casesPercentage: 0,
      deathPercentage: 0,
      nowCase: 0,
      nowPercentage: 0,
      prefNowCase: 0,
      prefNowPercentage: 0,
      prefName: "",
      updated: ""
    };
  },
  watch: {
    selected() {
      this.$store.commit("prefTotal", this.prefDataFilter(this.selected));
      console.log(this.selected);
    },
    coronaTotalData() {
      this.numPercentage(this.coronaTotalData);
      this.nowCases(this.coronaTotalData);
      this.lastUpdate(this.coronaTotalData.lastUpdated);
    },
    coronaPrefData() {
      this.prefFilter(this.coronaPrefData);
    }
  },
  methods: {
    lastUpdate(date) {
      const a = String(date);
      const b = a.slice(0, 4); //年
      const c = a.slice(4, 6); //月
      const d = a.slice(6, 8); //日
      this.updated = `最終更新日${b}年${c}月${d}日`;
      console.log(a);
    },
    numComma(num) {
      return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    numPercentage(total) {
      let death = (total.deaths / total.cases) * 100;
      let pcr = (total.pcr / total.population) * 100;
      let cases = (total.cases / total.population) * 100;
      this.pcrPercentage = Math.floor(pcr * 10000) / 10000;
      this.casesPercentage = Math.floor(cases * 10000) / 10000;
      this.deathPercentage = Math.floor(death * 100) / 100;
    },
    nowCases(total) {
      let now = total.cases - total.discharge - total.deaths;
      let percentage = (now / total.population) * 100;
      this.nowCase = now;
      this.nowPercentage = Math.floor(percentage * 100000) / 100000;
    },
    prefFilter(pref) {
      let now = pref.cases - pref.discharge - pref.deaths;
      let percentage = (now / pref.population) * 100;
      this.prefNowCase = now;
      this.prefNowPercentage = Math.floor(percentage * 100000) / 100000;
      this.prefName = this.checkPref(pref.name_ja);
    },
    checkPref(prefName) {
      if (prefName === "東京") {
        return `${prefName}都`;
      } else if (prefName === "大阪" || prefName === "京都") {
        return `${prefName}府`;
      } else if (prefName !== "北海道") {
        return `${prefName}県`;
      } else {
        return prefName;
      }
    }
  }
};
</script>
<style>
#container {
  width: 100%;
}
#death {
  margin: 0 auto;
  width: 20%;
  font-size: 2rem;
  background-color: red;
  color: white;
  border-radius: 10px;
}
#death p {
  margin: 0;
}
#total {
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
  background-color: floralwhite;
}
#total__now {
  display: flex;
  color: white;
  padding-left: 1rem;
  justify-content: space-around;
  font-size: 1.4rem;
  background-color: #100038;
}
.total__now {
  margin: 0;
}
#percentage {
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
  background-color: floralwhite;
}
.total__font__span {
  font-size: 1rem;
}
.total__person {
  font-size: 0.9rem;
}
.title__now p {
  margin: 0;
  color: white;
  background-color: #100038;
}
</style>