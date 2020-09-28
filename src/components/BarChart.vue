<script>
import { Bar } from "vue-chartjs";
import { mapState } from "vuex";
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
    totalAndPref(pref) {
      this.datacollection.datasets = [];
      const total = this.ratio[0];
      const prefData = this.prefData;
      this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          {
            label: "全国(累計)",
            backgroundColor: this.randomColor(),
            borderWidth: 0,
            data: [
              total.cases,
              total.hospitalize,
              total.discharge,
              total.severe,
              total.deaths,
            ],
          },
          {
            label: `${prefData.prefecture}(累計)`,
            backgroundColor: this.randomColor(),
            borderWidth: 0,
            data: [
              prefData["cases"].today,
              prefData["hospitalize"].today,
              prefData["discharge"].today,
              prefData["severe"].today,
              prefData["deaths"].today,
            ],
          },
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
          backgroundColor: this.randomColor(),
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
      if(test) return
      this.renderChart(this.datacollection, this.options);
    },
    randomColor() {
      const max = 255;
      const min = 0;
      const color = [];
      let i = 0;
      while (i < 3) {
        const colorCode = Math.floor(Math.random() * (max + 1 - min)) + min;
        color.push(colorCode);
        i++;
      }
      return `rgb(${color})`;
    },
  },
};
</script>