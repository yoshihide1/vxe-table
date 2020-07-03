<template>
  <div>
    <button @click="aggregate">統計データ取得</button>
    <vxe-table border height="300" :data="coronaPref">
      <vxe-table-column field="name_ja" title="都道府県"></vxe-table-column>
      <vxe-table-column field="cases" title="感染者数" sortable></vxe-table-column>
      <vxe-table-column field="hospitalize" title="入院中" sortable></vxe-table-column>
      <vxe-table-column field="discharge" title="退院" sortable></vxe-table-column>
      <vxe-table-column field="deaths" title="死者" sortable></vxe-table-column>
      <vxe-table-column field="severe" title="重症" sortable></vxe-table-column>
      <vxe-table-column field="pcr" title="PCR検査数" sortable></vxe-table-column>
      <vxe-table-column field="population" title="人口" sortable></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      coronaPref: [],
      coronaTotal: {},
      cases: 0,
      deaths: 0,
      discharge: 0,
      hospitalize: 0,
      pcr: 0,
      population: 0,
      severe: 0,
      prefectures: "https://covid19-japan-web-api.now.sh/api/v1/prefectures",
      total: "https://covid19-japan-web-api.now.sh/api/v1/total"
    };
  },

  computed: {
    ...mapState(["coronaData"])
  },
  watch: {
    coronaData() {
      this.setData(this.coronaData);
    },
    coronaDataTotal() {
      this.setTotalData(this.coronaDataTotal);
    }
  },
  methods: {
    aggregate() {
      this.$store.dispatch("coronaPrefectures", this.prefectures);
    },
    setData(prefData) {
      console.log(prefData);
      this.coronaPref = prefData[0];
      this.totalData(prefData[0]);
    },

    totalData(data) {
      data.forEach(num => {
        this.cases += num.cases; //感染者
        this.deaths += num.deaths; //死者
        this.discharge += num.discharge; //退院
        this.hospitalize += num.hospitalize; //入院
        this.pcr += num.pcr; //PCR検査
        this.population += num.population; //人口
        this.severe += num.severe; //重症
      });
      console.log(this.cases);
      console.log(this.deaths);
      console.log(this.discharge);
      console.log(this.hospitalize);
      console.log(this.pcr);
      console.log(this.population);
      console.log(this.severe);
    },
    setTotalData(totalData) {
      console.log(totalData);
      this.coronaTotal = totalData;
    }
  }
};
</script>

<style>
</style>