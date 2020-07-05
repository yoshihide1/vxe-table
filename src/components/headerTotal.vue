<template>
  <div id="container">
    <div id="death">
    <p>致死率
      </p>
      <p>
      {{ deathPercentage }}%
      </p>

    </div>
    <div id="total">
      <p>累計</p>
      <p>
        PCR検査：{{ coronaTotalData.pcr }}
        <span class="total__font__span">人</span>
      </p>
      <p>
        感染者：{{ coronaTotalData.cases }}
        <span class="total__font__span">人</span>
      </p>
      <p>
        死者：{{ coronaTotalData.deaths }}
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
    <div id="total__now">
      <p>現在(全国)</p>
      <p>
        感染者：{{ nowCase }}
        <span class="total__font__span">人</span>
      </p>
      <p>人口の{{ nowPercentage }}%</p>
    </div>
    <div id="total__now">
      <p>{{ prefName }}</p>
      <p>
        感染者：{{ prefNowCase }}
        <span class="total__font__span">人</span>
      </p>
      <p>人口の{{ prefNowPercentage }}%</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["coronaTotalData", "coronaPrefData"])
  },
  data() {
    return {
      pcrPercentage: 0,
      casesPercentage: 0,
      nowCase: 0,
      nowPercentage: 0,
      prefNowCase: 0,
      prefNowPercentage: 0,
      prefName: ""
    };
  },
  watch: {
    coronaTotalData() {
      this.numFilter(this.coronaTotalData);
      this.nowCases(this.coronaTotalData);
    },
    coronaPrefData() {
      this.prefFilter(this.coronaPrefData)
    }
  },
  methods: {
    numFilter(total) {
      let death = (total.deaths/total.cases) * 100
      let pcr = (total.pcr / total.population) * 100;
      let cases = (total.cases / total.population) * 100;
      this.pcrPercentage = Math.floor(pcr * 10000) / 10000;
      this.casesPercentage = Math.floor(cases * 10000) / 10000;
      this.deathPercentage = Math.floor(death * 100) /100
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
      this.prefName = pref.name_ja
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
  background-color: #802640;
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
</style>