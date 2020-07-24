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
          "PCR検査(累計)",
          "感染者(累計)"
        ],
        datasets: [
          {
            label: [""],
            backgroundColor: ["blue", "red"],
            borderWidth: 0,
            pointBorderColor: "#249EBF",
            data: [
              total["pcr"].today,
              total["cases"].today,
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