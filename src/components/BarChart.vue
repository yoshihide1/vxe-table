<script>
import { Bar } from "vue-chartjs";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Bar,
  computed: {
    ...mapState([
      "coronaTotalData",
      "coronaData",
      "coronaPrefData",
      "chartPlus",
    ]),
    ...mapGetters(["prefDataFilter"])
  },
  data() {
    return {
      datacollection: {},
      options: {},
      total: null,
      prefTotal: null
    };
  },
  watch: {
    coronaTotalData() {
      this.totalAndPref();
    },
    coronaPrefData() {
      this.totalAndPref(this.chartPlus[0]);
    },
    chartPlus() {
      this.totalAndPref(this.chartPlus[0]);
    }
  },
  methods: {
    plus(data) {
      console.log(data);
      data.forEach(pref => {
        this.datacollection.datasets.push({
          label: `${pref.name_ja}(累計)`,
          backgroundColor: "#FFB43B",
          borderWidth: 1,
          pointBorderColor: "glay",
          data: [
            pref.cases,
            pref.hospitalize,
            pref.discharge,
            pref.severe,
            pref.deaths
          ]
        });
      });
      this.renderChart(this.datacollection, this.options);
    },
    totalAndPref(pref) {
      this.datacollection.datasets = [];
      this.total = this.coronaTotalData;
      this.prefTotal = this.coronaPrefData;
      this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          {
            label: "全国(累計)",
            backgroundColor: "#1E0B14",
            borderWidth: 1,
            pointBorderColor: "glay",
            data: [
              this.total.cases,
              this.total.hospitalize,
              this.total.discharge,
              this.total.severe,
              this.total.deaths
            ]
          },
          {
            label: `${this.prefTotal.name_ja}(累計)`,
            backgroundColor: "#FF395A",
            borderWidth: 1,
            pointBorderColor: "glay",
            data: [
              this.prefTotal.cases,
              this.prefTotal.hospitalize,
              this.prefTotal.discharge,
              this.prefTotal.severe,
              this.prefTotal.deaths
            ]
          }
        ]
      };
      this.options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      };

      if (pref) {
        this.plus(pref);
      } else {
        this.renderChart(this.datacollection, this.options);
      }
    }
  }
};
</script>