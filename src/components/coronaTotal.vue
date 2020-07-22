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
        :sorter="{resetable: true}"
        pagination
      >
        <template #checkbox="{item}">
          <td>
            <input type="checkbox" :value="item.pref_id" v-model="chartSet" />
          </td>
        </template>
        <template #cases="{item}">
          <td>
            {{item.cases}}
            <span class="table__plus">{{ item.casesRatio}}</span>
          </td>
        </template>
        <template #hospitalize="{item}">
          <td>
            {{item.hospitalize}}
            <span class="table__plus">{{ item.hospitalizeRatio}}</span>
          </td>
        </template>
        <template #discharge="{item}">
          <td>
            {{ item.discharge }}
            <span class="table__good">{{ item.dischargeRatio }}</span>
          </td>
        </template>
        <template #severe="{item}">
          <td>
            {{ item.severe }}
            <span class="table__plus">{{ item.severeRatio }}</span>
          </td>
        </template>
        <template #deaths="{item}">
          <td>
            {{ item.deaths }}
            <span class="table__plus">{{ item.deathsRatio }}</span>
          </td>
        </template>
        <template #pcr="{item}">
          <td>
            {{ item.pcr }}
            <span class="table__good">{{ item.pcrRatio }}</span>
          </td>
        </template>
        <template #population="{item}">
          <td>{{ item.population }}</td>
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
        { key: "checkbox", label: "", sorter: false },
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
    ...mapGetters(["prefDataFilter", "comparison"])
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
          cases: Number(data[i]["cases"].today),
          casesRatio: this.comparison(data[i], "cases"),
          hospitalize: Number(data[i]["hospitalize"].today),
          hospitalizeRatio: this.comparison(data[i], "hospitalize"),
          discharge: Number(data[i]["discharge"].today),
          dischargeRatio: this.comparison(data[i], "discharge"),
          severe: Number(data[i]["severe"].today),
          severeRatio: this.comparison(data[i], "severe"),
          deaths: Number(data[i]["deaths"].today),
          deathsRatio: this.comparison(data[i], "deaths"),
          pcr: Number(data[i]["pcr"].today),
          pcrRatio: this.comparison(data[i], "pcr"),
          population: Number(data[i]["population"].today)
        });
      }
    },
    chartCheck(prefCode) {
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
.test {
  font-size: 2rem;
}
.position-relative th {
  color: white;
  background-color: #0F6347;
}
.table__plus {
  font-size: 0.7rem;
  color: red;
}
.table__good {
  font-size: 0.7rem;
  color: blue;
}
</style>