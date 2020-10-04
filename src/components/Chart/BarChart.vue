<script>
import { Bar } from "vue-chartjs";
import { chartOptions } from "../../modules/chartModule.js";
import { mapState } from "vuex";
import randomColor from "randomcolor";
export default {
  extends: Bar,
  computed: {
    ...mapState(["ratio", "prefData", "chartPlus"]),
  },
  data() {
    return {
      datacollection: {},
      options: {},
      total: null,
      prefTotal: null,
    };
  },
  watch: {
    prefData() {
      this.totalAndPref();
    },
    chartPlus() {
      this.totalAndPref(this.chartPlus[0]);
    },
  },
  methods: {
    totalDataSet(totalData) {
      return {
        label: "全国(累計)",
        backgroundColor: randomColor({ luminosity: "dark" }),
        borderWidth: 0,
        data: [
          totalData.cases,
          totalData.hospitalize,
          totalData.discharge,
          totalData.severe,
          totalData.deaths,
        ],
      };
    },
    totalPrefDataSet(prefData) {
      return {
        label: `${prefData.prefecture}(累計)`,
        backgroundColor: randomColor({ luminosity: "dark" }),
        borderWidth: 0,
        data: [
          prefData["cases"].today,
          prefData["hospitalize"].today,
          prefData["discharge"].today,
          prefData["severe"].today,
          prefData["deaths"].today,
        ],
      };
    },
    totalAndPref(pref) {
      this.datacollection.datasets = [];
      const totalData = this.ratio[0];
      const prefData = this.prefData;
      this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          this.totalDataSet(totalData),
          this.totalPrefDataSet(prefData),
        ],
      };
      this.options = chartOptions();

      if (pref) {
        this.plus(pref);
      } else {
        this.renderChart(this.datacollection, this.options);
      }
    },
    plus(data, test = false) {
      data.forEach((pref) => {
        this.datacollection.datasets.push(this.totalPrefDataSet(pref));
      });
      if (test) return;
      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>