<template>
  <div class="container">
    <p>{{chartSet}}</p>
    <table class="table">
      <thead>
        <tr>
          <th class="table__title"></th>
          <th class="table__title">都道府県</th>
          <th class="table__title">感染者</th>
          <th class="table__title">入院中</th>
          <th class="table__title">退院</th>
          <th class="table__title">死者</th>
          <th class="table__title">重症</th>
          <th class="table__title">PCR検査</th>
          <th class="table__title">人口</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in coronaPref" :key="data.id">
          <td class="table__body">
            <input type="checkbox" :value="data.id" v-model="chartSet" />
          </td>
          <td class="table__body">{{ data.name_ja }}</td>
          <td class="table__body">{{ data.cases }}</td>
          <td class="table__body">{{ data.hospitalize }}</td>
          <td class="table__body">{{ data.discharge }}</td>
          <td class="table__body">{{ data.deaths }}</td>
          <td class="table__body">{{ data.severe }}</td>
          <td class="table__body">{{ data.pcr }}</td>
          <td class="table__body">{{ data.population}}</td>
        </tr>
      </tbody>
    </table>
    <!-- <vxe-table border height="300" highlight-hover-row ref="xTable6" :data="coronaPref">
      <vxe-table-column field="name_ja" title="都道府県"></vxe-table-column>
      <vxe-table-column field="cases" title="感染者数" sortable></vxe-table-column>
      <vxe-table-column field="hospitalize" title="入院中" sortable></vxe-table-column>
      <vxe-table-column field="discharge" title="退院" sortable></vxe-table-column>
      <vxe-table-column field="deaths" title="死者" sortable></vxe-table-column>
      <vxe-table-column field="severe" title="重症" sortable></vxe-table-column>
      <vxe-table-column field="pcr" title="PCR検査数" sortable></vxe-table-column>
      <vxe-table-column field="population" title="人口" sortable></vxe-table-column>
    </vxe-table> -->
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
      total: {},
      chartSet: []
    };
  },

  computed: {
    ...mapState(["coronaData", "coronaTotalData", "coronaPrefData"]),
    ...mapGetters(["prefDataFilter", "chartDeleteFilter"])
  },
  watch: {
    coronaData() {
      this.setData(this.coronaData);
    },
    coronaTotalData() {
      this.$store.commit("prefTotal", this.prefDataFilter(this.selected));
    },
    chartSet() {
      this.chartCheck(this.chartSet);
    }
  },
  mounted() {
    this.$store.dispatch("coronaPrefectures");
  },

  methods: {
    chartCheck(prefCode) {
      let pref = []
      prefCode.forEach((code) => {  
        console.log(code)
        console.log(this.prefDataFilter(code)[0])
        pref.push(this.prefDataFilter(code)[0])
      })
      console.log(pref)
      this.$store.commit("chart", pref)
    },
    setData(prefData) {
      this.coronaPref = prefData;
      this.totalData(prefData);
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
.table {
  border: 1px solid black;
  width: 100%;
}
.table__title {
  border: 1px solid black;
}
.table__body {
  border-top: 1px solid gray;
  border-left: 1px solid gray;
}
</style>