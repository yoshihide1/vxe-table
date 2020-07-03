<template>
  <div>
    <button @click="aggregate">統計データ取得</button>
    <p>{{ coronaTotal.death}}</p>
    <vxe-table border height="300" :data="coronaPref">
      <vxe-table-column field="id" title="ID" width="70" sortable></vxe-table-column>
      <vxe-table-column field="name_ja" title="都道府県"></vxe-table-column>
      <vxe-table-column field="cases" title="感染者数" sortable></vxe-table-column>
      <vxe-table-column field="population" title="人口" sortable></vxe-table-column>
      <vxe-table-column field="deaths" title="死者" sortable></vxe-table-column>
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
      prefectures: "https://covid19-japan-web-api.now.sh/api/v1/prefectures",
      total: "https://covid19-japan-web-api.now.sh/api/v1/total"
    };
  },

  computed: {
    ...mapState(["coronaData", "coronaDataTotal"])
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
      this.$store.dispatch("coronaTotal", this.total);
    },
    setData(prefData) {
      console.log(prefData);
      this.coronaPref = prefData[0];
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