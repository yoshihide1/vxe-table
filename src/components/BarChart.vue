<script>
import { Bar } from "vue-chartjs";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Bar,
  computed: {
    ...mapState(["ratio", "coronaPrefData", "chartPlus"]),
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
    ratio() {
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
    randomColor() {
      let max = 240;
      let min = 0;
      let color = [];
      let i = 0;
      while (i < 3) {
        let colorCode = Math.floor(Math.random() * (max + 1 - min)) + min;
        color.push(colorCode);
        i++;
      }
      return `rgb(${color})`;
    },
    plus(data) {
      data.forEach(pref => {
        this.datacollection.datasets.push({
          label: `${pref.prefecture}(累計)`,
          backgroundColor: this.randomColor(),
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
      this.total = this.ratio[0];
      this.prefTotal = this.coronaPrefData;
      this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          {
            label: "全国(累計)",
            backgroundColor: "#0B0000",
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
            label: `${this.prefTotal.prefecture}(累計)`,
            backgroundColor: this.randomColor(),
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