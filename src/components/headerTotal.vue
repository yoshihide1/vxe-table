<template>
  <div id="container">
    <div class="title__now">
      <p>{{ updated }}</p>
    </div>
    <div id="total">

<!-- Cumulative -->
      <div class="card">
        <div class="card__title">
          <p>累計</p>
        </div>
        <div class="card__body">
          <p>
            <span class="card__font__span">PCR検査</span>
            ：{{ numComma(ratio[0].pcr) }}
            <span class="card__font__span">人</span>
          </p>
          <p>
            <span class="card__font__span">感染者</span>
            ：{{ numComma(ratio[0].cases) }}
            <span class="card__font__span">人</span>
          </p>
          <p>
            <span class="card__font__span">死者</span>
            ：{{ numComma(ratio[0].deaths) }}
            <span class="card__font__span">人</span>
          </p>
          <p class="death">
            <span class="card__font__span">致死率</span>
            {{ deathPercentage }}%
          </p>
        </div>
      </div>

<!-- PopulationRatio -->
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
            <span class="card__font__span">国内の人口:{{ numComma(ratio[0].population) }}人</span>
          </p>
        </div>
      </div>


      <div class="card">
        <div class="card__title">
          <p>
            日本国内
            <span class="card__font__span">(現在)</span>
          </p>
        </div>
        <div class="card__body">
          <p>
            <span class="card__font__span">感染者</span>
            ：{{ numComma(nowCase) }}
            <span class="card__font__span">人</span>
          </p>
          <p>
            <span class="card__font__span">国内人口の</span>
            {{ nowPercentage }}%
          </p>
          <p>
            <span class="card__font__span">国内の人口:{{ numComma(ratio[0].population) }}人</span>
          </p>
        </div>
      </div>


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
            <span
              class="card__font__span"
            >{{ prefName }}の人口:{{ numComma(coronaPrefData.population) }}人</span>
          </p>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import prefs from "../assets/prefectures.json";
export default {
  computed: {
    ...mapState(["coronaData", "coronaPrefData", "ratio"]),
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
    },
    coronaData() {
      this.$store.commit("prefTotal", this.prefDataFilter(this.selected));
    },
    ratio() {
      this.numPercentage(this.ratio[0]);
      this.nowCases(this.ratio[0]);
      this.lastUpdate(this.ratio[0].date);
    },
    coronaPrefData() {
      this.prefFilter(this.coronaPrefData);
    }
  },
  methods: {
    lastUpdate(date) {
      const a = String(date);
      const b = a.slice(0, 4); //年
      const c = a.slice(5, 7); //月
      const d = a.slice(8, 10); //日
      this.updated = `最終更新日${b}年${c}月${d}日`;
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
      this.prefName = this.checkPref(pref.prefecture);
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
#total {
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
}
.card {
  width: 20%;
  font-size: 1.4rem;
}
.card__title {
  position: relative;
  /* background-color: gray; */
  bottom: -15px;
  overflow: hidden;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  padding: 0.2rem;
  font-weight: bolder;
  background: linear-gradient(#829ebc, #354453fd);
}
.card__title p {
  margin: 1rem;
}
.card__body {
  background-color: white;
  color: black;
  padding: 0.4rem;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}
.card__title select {
  font-size: 1.4rem;
  padding: 0 1rem 5px;
  margin-right: 0.5rem;
  border: 2px solid white;
  border-radius: 5px;
  text-indent: 10px;
  background: none transparent;
  color: white;
}
.card__title select option {
  color: black;
}
.card__font__span {
  font-size: 0.9rem;
}
.title__now p {
  margin: 0;
  color: white;
  background-color: #100038;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

@media screen and (max-width: 768px) {
  #total {
    display: block;
  }
  .card {
    width: 90%;
    margin: 0 auto;
  }
}
</style>