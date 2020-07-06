<template>
  <div id="container">
    <div class="title__now">
      <p>{{ updated }}</p>
    </div>
    <div id="total">
      <div class="total__info">
        <p class="total__title">累計</p>
        <p>
          <span class="total__font__span">PCR検査</span>
          ：{{ numComma(coronaTotalData.pcr) }}
          <span class="total__font__span">人</span>
        </p>
        <p>
          <span class="total__font__span">感染者</span>
          ：{{ numComma(coronaTotalData.cases) }}
          <span class="total__font__span">人</span>
        </p>
        <p>
          <span class="total__font__span">死者</span>
          ：{{ numComma(coronaTotalData.deaths) }}
          <span class="total__font__span">人</span>
        </p>
      </div>
      <div class="total__info">
        <p class="total__title">人口に対する割合</p>
        <p>
          <span class="total__font__span">PCR検査</span>
          ：{{ pcrPercentage }}
          <span class="total__font__span">％</span>
        </p>
        <p>
          <span class="total__font__span">感染者</span>
          ：{{ casesPercentage }}
          <span class="total__font__span">％</span>
        </p>
        <p>
          <span class="total__font__span">国内の人口:{{ numComma(coronaTotalData.population) }}人</span>
        </p>
      </div>
      <div class="total__info">
        <p class="total__title">
          日本国内
          <span class="total__font__span">(現在)</span>
        </p>
        <p>
          <span class="total__font__span">感染者</span>
          ：{{ numComma(nowCase) }}
          <span class="total__font__span">人</span>
        </p>
        <p>
          <span class="total__font__span">国内人口の</span>
          {{ nowPercentage }}%
        </p>
        <p>
          <span class="total__font__span">国内の人口:{{ numComma(coronaTotalData.population) }}人</span>
        </p>
      </div>

      <div class="total__info">
        <p class="total__title">
          {{ prefName }}
          <select v-model="selected">
            <option v-for="pref in prefs" :key="pref.code" :value="pref.code">{{ pref.name }}</option>
          </select>
          <span class="total__font__span">(現在)</span>
        </p>
        <p></p>
        <p>
          <span class="total__font__span">感染者</span>
          ：{{ numComma(prefNowCase) }}
          <span class="total__font__span">人</span>
        </p>
        <p>
          <span class="total__font__span">{{ prefName }}人口の</span>
          {{ prefNowPercentage }}%
        </p>
        <p>
          <span
            class="total__font__span"
          >{{ prefName }}の人口:{{ numComma(coronaPrefData.population) }}人</span>
        </p>
      </div>
    </div>
    <div id="death">
      <p>
        <span class="total__font__span">致死率</span>
        {{ deathPercentage }}%
      </p>
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
  margin: 1rem auto;
  width: 20%;
  background-color: red;
  color: white;
  border-radius: 5px;
}
#death p {
  margin: 0;
}
#total {
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
}
.total__title {
  margin-top: 0;
  border-bottom: 2px solid white;
}
.total__info {
  background-color: #100038;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem;
}
.total__font__span {
  font-size: 0.9rem;
}
.title__now p {
  margin: 0;
  color: white;
  background-color: #100038;
}
</style>