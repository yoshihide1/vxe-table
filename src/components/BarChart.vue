<script>
import { Bar } from "vue-chartjs";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Bar,
  computed: {
    ...mapState(["coronaTotalData", "coronaData", "prefInfo"]),
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
      console.log(this.coronaData);
    },
    prefInfo() {
      this.totalAndPref();
    }
  },
  methods: {
    totalAndPref() {
      this.total = this.coronaTotalData;
      this.prefTotal = this.prefInfo;
      (this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          {
            label: "全国",
            backgroundColor: "#1C1E59",
            pointBackgroundColor: "red",
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
            label: this.prefTotal.name_ja,
            backgroundColor: "#DE4027",
            pointBackgroundColor: "red",
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