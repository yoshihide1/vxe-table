<script>
import { Pie } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Pie,
  computed: {
    ...mapState(["prefData"]),
  },
  data() {
    return {
      datacollection: {},
      options: {},
    };
  },
  watch: {
    prefData() {
      this.totalChart();
    },
  },
  methods: {
    totalChart() {
      let total = this.prefData;
      (this.datacollection = {
        labels: [
          `${total.prefecture}：入院中(現在)`,
          "重症(現在)",
          "死者(累計)",
        ],
        datasets: [
          {
            label: [""],
            backgroundColor: ["#3A6BA5", "#F1CD42", "#F24C0C"],
            pointBackgroundColor: "black",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: [
              total["hospitalize"].today,
              total["severe"].today,
              total["deaths"].today,
            ],
          },
        ],
      }),
        (this.options = {
          scales: {},
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        });
      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>