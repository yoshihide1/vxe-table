<template>
  <div class="container">
    <div class="table">
      <table class="table__main">
        <thead class="table__head">
          <tr>
            <th class="table__title"></th>
            <th class="table__title">都道府県</th>
            <th @click="sortBy('cases')" :class="sortedClass('cases')" class="table__title">感染者</th>
            <th
              @click="sortBy('hospitalize')"
              :class="sortedClass('hospitalize')"
              class="table__title"
            >入院中</th>
            <th
              @click="sortBy('discharge')"
              :class="sortedClass('discharge')"
              class="table__title"
            >退院</th>
            <th @click="sortBy('deaths')" :class="sortedClass('deaths')" class="table__title">死者</th>
            <th @click="sortBy('severe')" :class="sortedClass('severe')" class="table__title">重症</th>
            <th @click="sortBy('pcr')" :class="sortedClass('pcr')" class="table__title">PCR検査</th>
            <th
              @click="sortBy('population')"
              :class="sortedClass('population')"
              class="table__title"
            >人口</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="data in coronaDataSort" :key="data.pref_id">
            <td class="table__body__sub">
              <input type="checkbox" :value="data.pref_id" v-model="chartSet" />
            </td>
            <td class="table__body__sub">{{ data.prefecture }}</td>
            <td class="table__body__sub">{{ data.cases }}</td>
            <td class="table__body__sub">{{ data.hospitalize }}</td>
            <td class="table__body__sub">{{ data.discharge }}</td>
            <td class="table__body__sub">{{ data.deaths }}</td>
            <td class="table__body__sub">{{ data.severe }}</td>
            <td class="table__body__sub">{{ data.pcr }}</td>
            <td class="table__body__sub">{{ data.population}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      coronaPref: [],
      sort: {
        key: "",
        isAsc: false // 昇順ならtrue,降順ならfalse
      },
      selected: 13,
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
    ...mapState(["newCoronaData", "coronaPrefData"]),
    ...mapGetters(["newPrefFilter"]),

    coronaDataSort() {
      let list = this.newCoronaData.slice();
      console.log(list);
      console.log(this.sort.key);
      if (this.sort.key) {
        list.sort((a, b) => {
          a = Number(a[this.sort.key]);
          b = Number(b[this.sort.key]);
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      return list;
    }
  },
  watch: {
    chartSet() {
      this.chartCheck(this.chartSet);
    }
  },

  methods: {
    sortBy(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
    sortedClass(key) {
      return this.sort.key === key
        ? `sorted ${this.sort.isAsc ? "asc" : "desc"}`
        : "";
    },

    chartCheck(prefCode) {
      let pref = [];
      prefCode.forEach(code => {
        console.log(code);
        console.log(this.newPrefFilter(code)[0]);
        pref.push(this.newPrefFilter(code)[0]);
      });
      console.log(pref);
      this.$store.commit("chart", pref);
    }
  },
  mounted() {
    // this.$store.dispatch("coronaPrefectures");
    this.$store.dispatch("coronaTotal");
    this.$store.dispatch("coronaToday");
    this.$store.dispatch("coronaTwoDay");
  }
};
</script>

<style>
th.sorted.desc::after {
  display: inline-block;
  content: "▼";
}
th.sorted.asc::after {
  display: inline-block;
  content: "▲";
}
.container {
  margin-bottom: 1rem;
}
.table {
  color: #5e5e5e;
  max-height: 300px;
  overflow: auto;
  overflow-x: hidden;
}
.table thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.table__main {
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: separate;
  border-spacing: 0;
}
.table__main th:first-child {
  border-radius: 5px 0 0 0;
}

.table__main th:last-child {
  border-radius: 0 5px 0 0;
  border-right: 1px solid #3c6690;
}
.table__title {
  border-left: 1px solid #242b33;
  border-top: 1px solid #242b33;
  border-bottom: 1px solid #242b33;
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.3) inset;
  padding: 1rem;
  font-weight: bolder;
  background: linear-gradient(#829ebc, #354453fd);
  color: white;
  padding: 1rem 0;
}

.table__body__sub {
  border-left: 1px solid #242b33;
  border-bottom: 1px solid #242b33;
  border-top: none;
  box-shadow: 0px -3px 5px 1px #eee inset;
  padding: 0.8rem;
}

@media screen and (max-width: 768px) {
  .table {
    overflow-x: auto;
  }
}
</style>