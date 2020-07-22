<template>
  <div>
    <CCardBody>
      <CDataTable
        :items="tableData"
        :fields="fields"
        items-per-page-select
        :items-per-page="5"
        hover
        border
        striped
        sorter
        pagination
      >
        <template #show_details="{item}">
          <td class="py-2">
            <input type="checkbox" :value="item.pref_id" v-model="chartSet" />
          </td>
        </template>
      </CDataTable>
    </CCardBody>

    <!-- <div class="container-fluid">
      <div class="table">
        <table class="table">
          <thead>
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

              <td class="table__body__sub">{{ data['prefecture'] }}</td>
              <td class="table__body__sub">
                {{ data['cases'].today }}
                <span
                  class="card__font__comparison"
                >(+{{ comparison(data, "cases") }})</span>
              </td>
              <td class="table__body__sub">
                {{ data['hospitalize'].today }}
                <span
                  class="card__font__comparison"
                >(+{{ comparison(data, "hospitalize") }})</span>
              </td>
              <td class="table__body__sub">
                {{ data['discharge'].today }}
                <span
                  class="card__font__comparison discharge"
                >(+{{ comparison(data, "discharge") }})</span>
              </td>
              <td class="table__body__sub">
                {{ data['deaths'].today }}
                <span
                  class="card__font__comparison"
                >(+{{ comparison(data, "deaths") }})</span>
              </td>
              <td class="table__body__sub">
                {{ data['severe'].today }}
                <span
                  class="card__font__comparison"
                >(+{{ comparison(data, "severe") }})</span>
              </td>
              <td class="table__body__sub">
                {{ data['pcr'].today }}
                <span
                  class="card__font__comparison"
                >(+{{ comparison(data, "pcr") }})</span>
              </td>
              <td class="table__body__sub">{{ data['population'].today }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      chartSet: [],
      sort: {
        key: "",
        isAsc: false // 昇順ならtrue,降順ならfalse
      },
      selected: 13,
      tableData: [],
      fields: [
        { key: "show_details", label: "", sorter: false },
        { key: "prefecture", label: "都道府県", sorter: false },
        { key: "cases", label: "感染者", _style: "min-width:70px" },
        { key: "hospitalize", label: "入院中", _style: "min-width:70px" },
        { key: "discharge", label: "退院", _style: "min-width:70px" },
        { key: "severe", label: "重症", _style: "min-width:70px" },
        { key: "deaths", label: "死者", _style: "min-width:70px" },
        { key: "pcr", label: "PCR検査", _style: "min-width:70px" },
        { key: "population", label: "人口", _style: "min-width:70px" }
      ]
    };
  },

  computed: {
    ...mapState(["allCoronaData"]),
    ...mapGetters(["prefDataFilter"]),

    coronaDataSort() {
      let list = this.allCoronaData.slice();
      if (this.sort.key) {
        list.sort((a, b) => {
          a = Number(a[this.sort.key].today);
          b = Number(b[this.sort.key].today);
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      return list;
    }
  },
  watch: {
    chartSet() {
      this.chartCheck(this.chartSet);
    },
    allCoronaData() {
      this.coronaTable(this.allCoronaData);
    }
  },
  methods: {
    test(data) {
      console.log(data);
    },
    coronaTable(data) {
      console.log(data);
      for (let i in data) {
        this.tableData.push({
          pref_id: Number(data[i].pref_id),
          prefecture: data[i].prefecture,
          cases: Number(data[i]["cases"].today),
          hospitalize: Number(data[i]["hospitalize"].today),
          discharge: Number(data[i]["discharge"].today),
          severe: Number(data[i]["severe"].today),
          deaths: Number(data[i]["deaths"].today),
          pcr: Number(data[i]["pcr"].today),
          population: Number(data[i]["population"].today)
        });
      }
    },
    comparison(data, value) {
      let name = value;
      return data[name].today - data[name].yesterday;
    },
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
      console.log(prefCode);
      let pref = [];
      prefCode.forEach(code => {
        console.log(this.prefDataFilter(code));
        pref.push(this.prefDataFilter(code)[0]);
      });
      this.$store.commit("chart", pref);
    }
  }
};
</script>

<style>
.color {
  color: red;
}
th.sorted.desc::after {
  display: inline-block;
  content: "▼";
}
th.sorted.asc::after {
  display: inline-block;
  content: "▲";
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
.card__font__comparison.discharge {
  color: blue;
}
.card__font__comparison {
  font-size: 0.7rem;
  color: red;
}

@media screen and (max-width: 768px) {
  .table {
    overflow-x: auto;
  }
}
</style>