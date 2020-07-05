<template>
  <div class="container">
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
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: 13,
      coronaPref: [],
      cases: 0,
      deaths: 0,
      discharge: 0,
      hospitalize: 0,
      pcr: 0,
      population: 0,
      severe: 0,
      total: {}
    };
  },

  computed: {
    ...mapState(["coronaData", "coronaTotalData", "coronaPrefData"]),
    ...mapGetters(["prefDataFilter"])
  },
  watch: {
    coronaData() {
      this.setData(this.coronaData);
    },
    coronaTotalData() {
      //coronaDataの合計値
      this.$store.commit("prefTotal", this.prefDataFilter(this.selected));
    }
  },
  methods: {
    aggregate() {
      //最後にcreatedに変える
      if (this.coronaTotalData.length == 0) {
        this.$store.dispatch("coronaPrefectures");
      }
    },
    setData(prefData) {
      this.coronaPref = prefData[0];
      this.totalData(prefData[0]);
    },
    totalData(data) {
      data.forEach(num => {
        this.total = {
          cases: (this.cases += num.cases), //感染者
          deaths: (this.deaths += num.deaths), //死者
          discharge: (this.discharge += num.discharge), //退院
          hospitalize: (this.hospitalize += num.hospitalize), //入院
          pcr: (this.pcr += num.pcr), //PCR検査
          population: (this.population += num.population), //人口
          severe: (this.severe += num.severe), //重症
          lastUpdated: num.last_updated.cases_date
        };
      });
      console.log(this.total);
      this.$store.commit("setTotalData", this.total);
    }
  }
};
</script>

<style>
.container {
  margin-bottom: 1rem;
}
</style>