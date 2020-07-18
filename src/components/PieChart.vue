<script>
import { Pie } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Pie,
  computed: {
    ...mapState(["newPrefData"])
  },
  data() {
    return {
      datacollection: {},
      options: {}
    };
  },
  watch: {
    newPrefData() {
      this.totalChart();
    }
  },
  methods: {
    totalChart() {
      let total = this.newPrefData;
      (this.datacollection = {
        labels: [
          `${total.prefecture}：入院中(現在)`,
          "重症(現在)",
          "死者(累計)"
        ],
        datasets: [
          {
            label: [""],
            backgroundColor: [
              // "#0E376F",
              "#3A6BA5",
              "#5C5344",
              "#F24C0C"
            ],
            pointBackgroundColor: "black",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: [
              // total.cases - total.discharge - total.deaths,
              total.hospitalize,
              total.severe,
              total.deaths
            ]
          }
        ]
      }),
        (this.options = {
          scales: {},
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