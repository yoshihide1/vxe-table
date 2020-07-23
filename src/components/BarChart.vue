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
      console.log(this.ratio[0])
      this.totalAndPref();
    },
    chartPlus() {
      this.totalAndPref(this.chartPlus[0]);
    },
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
      data.forEach((pref) => {
        this.datacollection.datasets.push({
          label: `${pref.prefecture}(累計)`,
          backgroundColor: this.randomColor(),
          borderWidth: 1,
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
      this.renderChart(this.datacollection, this.options);
    },
    totalAndPref(pref) {
      this.datacollection.datasets = [];
      let total = this.ratio[0];
      let prefData = this.prefData;
      this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          {
            label: "全国(累計)",
            backgroundColor: "#0B0000",
            borderWidth: 1,
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
            borderWidth: 1,
            pointBorderColor: "glay",
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
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      if (pref) {
        this.plus(pref);
      } else {
        this.renderChart(this.datacollection, this.options);
      }
    },
  },
};
</script>