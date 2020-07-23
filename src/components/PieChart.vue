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
          "入院中(現在)",
          "重症(現在)",
          "死者(累計)",
        ],
        datasets: [
          {
            label: [""],
            backgroundColor: ["#3A6BA5", "#F1CD42", "#F24C0C"],
            borderWidth: 0,
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
          title: {
            display: true,
            text: total.prefecture,
          },
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