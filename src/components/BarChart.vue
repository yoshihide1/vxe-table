<script>
import { Bar } from "vue-chartjs";
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
      randomColor: randomColor({ luminosity: "dark" }),
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
      this.options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          labels: {},
        },
        tooltips: {},
        responsive: true,
        maintainAspectRatio: false,
      };

      if (pref) {
        this.plus(pref);
      } else {
        this.renderChart(this.datacollection, this.options);
      }
    },
    plus(data, test = false) {
      data.forEach((pref) => {
        this.datacollection.datasets.push({
          label: `${pref.prefecture}(累計)`,
          backgroundColor: randomColor({ luminosity: "dark" }),
          borderWidth: 0,
          borderColor: "black",
          pointBorderColor: "glay",
          data: [
            pref["cases"].today,
            pref["hospitalize"].today,
            pref["discharge"].today,
            pref["severe"].today,
            pref["deaths"].today,
          ],
        });
      });
      if (test) return;
      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>