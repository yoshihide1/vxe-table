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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      chartSet: [],
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
    ...mapGetters(["prefDataFilter"])
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
    coronaTable(data) {
      for (let i in data) {
        this.tableData.push({
          pref_id: Number(data[i].pref_id),
          prefecture: data[i].prefecture,
          cases: `${Number(data[i]["cases"].today)} +${this.comparison(
            data[i],
            "cases"
          )}`,
          hospitalize: `${Number(
            data[i]["hospitalize"].today
          )} +${this.comparison(data[i], "hospitalize")}`,
          discharge: `${Number(data[i]["discharge"].today)} +${this.comparison(
            data[i],
            "discharge"
          )}`,
          severe: `${Number(data[i]["severe"].today)} +${this.comparison(
            data[i],
            "severe"
          )}`,
          deaths: `${Number(data[i]["deaths"].today)} +${this.comparison(
            data[i],
            "deaths"
          )}`,
          pcr: `${Number(data[i]["pcr"].today)} +${this.comparison(
            data[i],
            "pcr"
          )}`,
          population: `${Number(
            data[i]["population"].today
          )} +${this.comparison(data[i], "population")}`
        });
      }
    },
    comparison(data, value) {
      let name = value;
      return data[name].today - data[name].yesterday;
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
.position-relative th {
  color: white;
  background-color: #2eb85c;
}
</style>