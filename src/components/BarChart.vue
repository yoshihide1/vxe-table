<script>
import { Bar } from "vue-chartjs";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Bar,
  computed: {
    ...mapState(["coronaTotalData", "coronaData", "coronaPrefData"]),
    ...mapGetters(["prefData"])
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
      this.totalAndPref();
    }
  },
  methods: {
    totalAndPref() {
      this.total = this.coronaTotalData;
      this.prefTotal = this.coronaPrefData;
      (this.datacollection = {
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
            backgroundColor: "#F26C18",
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
      }),
        (this.options = {
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
        });
      this.renderChart(this.datacollection, this.options);
    }
  }
};
</script>